import VueConstructor from 'vue'

export default class VueAppContainerPlugin {
    /**
     * Install App Container Plugin
     * @param {VueConstructor} Vue
     */
    static install(Vue) {
        Vue.mixin({
            computed: {
                $app() {
                    return this.$root.$options.$app
                },
                $services() {
                    return this.$app.services
                }
            }
        })
    }
}
