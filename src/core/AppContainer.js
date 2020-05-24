import axios from 'axios'
import Bus from '@condenast/quick-bus'

import Config from './foundations/Config'
import Http from './foundations/Http'
import ServiceContainer from './ServiceContainer'

/**
 * PRIVATE_FIELD Symbol
 */
const PRIVATE_FIELD =
    typeof Symbol === 'undefined'
        ? `__AppContainer__${Date.now()}`
        : Symbol('AppContainer.private')

const Channel = new Bus()

const AppContainerEvent = {
    ready: 'AppContainer.ready'
}

export default class AppContainer {
    /**
     * Create a new instance of AppContainer
     * @param {AppOptions} app
     */
    constructor(app = {}) {
        this.name = app.name || `__AppContainer__${Date.now()}`
        this[PRIVATE_FIELD] = {}

        /**
         * @type {ConfigOptions}
         */
        const configOptions = app.config || {}

        const _config = new Config(configOptions)
        const _http = new Http(_config)
        const _services = new ServiceContainer(_http)

        this[PRIVATE_FIELD].config = _config
        this[PRIVATE_FIELD].http = _http
        this[PRIVATE_FIELD].services = _services

        this.fireReadyEvent()
    }

    /**
     * @returns {Config}
     */
    get config() {
        return this[PRIVATE_FIELD].config
    }

    /**
     * @returns {ServiceContainer}
     */
    get services() {
        return this[PRIVATE_FIELD].services
    }

    /**
     * @returns {axios}
     */
    get http() {
        return this[PRIVATE_FIELD].http.instance
    }

    /**
     * Emit Ready Event
     * @param {AppContainer} payload
     */
    fireReadyEvent(payload = this) {
        Channel.emit(AppContainerEvent.ready, payload)
    }

    /**
     * Register on container ready callback
     * @param {ContainerReadyCallback} callback
     * @returns {function} Stop listen for the callback
     */
    static ready(callback) {
        return Channel
            .on(AppContainerEvent.ready, function(payload) {
                callback(payload)
            })
    }
}

/**
 * @typedef AppOptions
 * @property {string} name Application name
 * @property {ConfigOptions} app.config name Application configurations
 */

/**
 * @typedef {Object} ConfigOptions
 * @property {string} baseURL
 * @property {number} timeout
 * @property {HeaderOptions} headers
 */

/**
 * @typedef {Object.<string, string>} HeaderOptions
 */

/**
 * @callback ContainerReadyCallback
 * @param {AppContainer} $app
 */
