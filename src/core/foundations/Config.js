import Bus from '@condenast/quick-bus'
import ObservableMixin from '../mixins/ObservableMixin'

/**
 * PRIVATE_FIELD Symbol
 */
const PRIVATE_FIELD =
    typeof Symbol === 'undefined'
        ? `__Config__${Date.now()}`
        : Symbol('Config.private')


const Channel = new Bus()

const ConfigEvent = {
    ready: 'ConfigEvent.ready',
    change: 'ConfigEvent.change'
}


export default class Config extends ObservableMixin {
    /**
     * Create new config instance
     * @param {object} config
     * @param {string} config.baseURL
     */
    constructor(config) {
        super()

        this[PRIVATE_FIELD] = {}

        this.update(config)
    }

    /**
     * Update configuration
     * @param {object} config
     * @param {string} config.gatewayURL
     * @param {string} config.baseURL
     */
    update(config = {}, fireEvent = true) {
        Object.assign(this[PRIVATE_FIELD], config)
        this.defineAttributesPropertyGetter(this[PRIVATE_FIELD])

        if (fireEvent) {
            this.fireChangeEvent()
        }
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

    /**
     * Fire change event
     * @param {this} payload
     */
    fireChangeEvent(payload = this) {
        Channel.emit(ConfigEvent.change, payload)
    }

    /**
     * Register on config update callback
     * @param {function} callback
     */
    change(callback) {
        Channel.on(ConfigEvent.change, function (payload) {
            callback(payload)
        })
    }
}
