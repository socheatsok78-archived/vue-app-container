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
        ? `__Engine__${Date.now()}`
        : Symbol('Engine.private')

const Channel = new Bus()

const AppContainerEvent = {
    ready: 'AppContainer.ready'
}

export default class AppContainer {
    /**
     * Create a new instance of AppContainer
     * @param {object} app
     * @param {string} app.name Application name
     * @param {object} app.config Application configurations
     */
    constructor(app = {}) {
        this.name = app.name || `__AppContainer__${Date.now()}`
        this[PRIVATE_FIELD] = {}

        const configOptions = app.config || {}

        const _config = new Config(configOptions)
        const _http = new Http(_config)
        const _services = new ServiceContainer(_http)

        this[PRIVATE_FIELD].config = _config
        this[PRIVATE_FIELD].http = _http
        this[PRIVATE_FIELD].services = _services

        this.emitReadyEvent()
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
     */
    emitReadyEvent() {
        Channel.emit(AppContainerEvent.ready, this)
    }

    /**
     * On container ready callback
     * @param {function} callback
     * @returns {function} Stop listen for the callback
     */
    static ready(callback) {
        return Channel
            .on(AppContainerEvent.ready, function(payload) {
                callback(payload)
            })
    }
}
