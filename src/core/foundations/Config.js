/**
 * PRIVATE_FIELD Symbol
 */
const PRIVATE_FIELD =
    typeof Symbol === 'undefined'
        ? `__Config__${Date.now()}`
        : Symbol('Config.private')

export default class Config {
    /**
     * Create new config instance
     * @param {object} config
     * @param {string} config.gatewayURL
     * @param {string} config.baseURL
     */
    constructor(config) {
        this[PRIVATE_FIELD] = {
            gatewayURL: '',
            baseURL: ''
        }

        this.update(config)
    }

    /**
     * Gateway URL Endpoint
     */
    get gatewayURL() {
        return this[PRIVATE_FIELD].gatewayURL
    }

    /**
     * Base URL Endpoint
     */
    get baseURL() {
        return `${this.gatewayURL}/${this[PRIVATE_FIELD].baseURL}`
    }

    /**
     * Update configuration
     * @param {object} config
     * @param {string} config.gatewayURL
     * @param {string} config.baseURL
     */
    update(config = {}) {
        this[PRIVATE_FIELD].gatewayURL = config.gatewayURL || ''
        this[PRIVATE_FIELD].baseURL = config.baseURL || ''
    }

    /**
     * Clone a remote configuration file
     * @param {string} url Remote config URL
     */
    async clone(url) {
        const config = await fetch(url)
            .then(res => res.json())

        this.update(config)
    }
}
