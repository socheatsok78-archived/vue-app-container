import axios from 'axios'
import Config from './Config'

/**
 * PRIVATE_FIELD Symbol
 */
const PRIVATE_FIELD =
    typeof Symbol === 'undefined'
        ? `__Http__${Date.now()}`
        : Symbol('Http.private')

export default class Http {
    /**
     * Create a new instance of Http
     * @param {Config} config
     */
    constructor(config) {
        this[PRIVATE_FIELD] = {}

        this[PRIVATE_FIELD].config = config
        this[PRIVATE_FIELD].instance = this.createInstance(config)

        this.observeConfigChange()
    }

    /**
     * @returns {axios}
     */
    get instance() {
        return this[PRIVATE_FIELD].instance
    }

    /**
     * @returns {Config}
     */
    get config() {
        return this[PRIVATE_FIELD].config
    }

    /**
     * Create new axios instance
     * @param {Config} config
     */
    createInstance(config) {
        return axios.create(config)
    }

    /**
     * Register watch config change listener
     */
    observeConfigChange() {
        this.config.change(config => {
            this[PRIVATE_FIELD].instance = this.createInstance(config)
        })
    }
}
