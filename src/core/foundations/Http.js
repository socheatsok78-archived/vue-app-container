import axios from 'axios'

// eslint-disable-next-line
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
        this[PRIVATE_FIELD].instance = axios.create(config)
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
}
