import axios from 'axios'
import Config from './foundations/Config'
import Http from './foundations/Http'

/**
 * PRIVATE_FIELD Symbol
 */
const PRIVATE_FIELD =
    typeof Symbol === 'undefined'
        ? `__ServiceContainer__${Date.now()}`
        : Symbol('ServiceContainer.private')

export default class ServiceContainer {
    /**
     * Create new instance of Service Container
     * @param {Http} http
     */
    constructor(http) {
        this[PRIVATE_FIELD] = {}
        this[PRIVATE_FIELD].http = http
    }

    /**
     * @returns {Http}
     */
    get $http() {
        return this[PRIVATE_FIELD].http
    }

    /**
     * Register a new service
     *
     * @param {string} name Service Name
     * @param {ServiceRegistry} service Service Registry Instance
     */
    register(name, service) {
        if (typeof service !== 'function') {
            this.throwServiceRegistryException()
        }

        Object.defineProperty(this, name, {
            enumerable: true,
            get () {
                return service(
                    this.$http.instance,
                    this.$http.config
                )
            }
        })
    }

    /**
     * Throw Service Registry Exception
     * @throws {Error}
     */
    throwServiceRegistryException() {
        throw new Error("Service Register must be a callback")
    }
}

/**
 * @callback ServiceRegistry
 * @param {axios} $http
 * @param {Config} $config
 * @returns {Object}
 */
