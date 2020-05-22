import AppContainer from '../src'

/**
 * Create new Application Container
 */
const $app = new AppContainer({
    config: {
        baseURL: 'https://jsonplaceholder.typicode.com'
    }
})

/**
 * Register interceptors
 */
$app.config.change(function () {
    $app.http.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
})

/**
 * Register post service
 */
$app.services.register('post', ($http) => {
    const baseURL = 'posts'

    return {
        async get(id = '') {
            try {
                const { data } = await $http.get(`${baseURL}/${id}`)
                return data
            } catch (error) {
                return error.config
            }
        }
    }
})

/**
 * Register photo service
 */
$app.services.register('photo', ($http) => {
    const baseURL = 'photos'

    return {
        async get(id = '') {
            try {
                const { data } = await $http.get(`${baseURL}/${id}`)

                return data
            } catch (error) {
                return error
            }
        }
    }
})

/**
 * Calling a service
 */
$app.services.post.get(1) //?
$app.services.photo.get(1) //?
