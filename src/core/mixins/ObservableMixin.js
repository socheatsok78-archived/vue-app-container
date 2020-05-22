/**
 * Observable Mixin
 * @method set Add new properties to the objects
 * @method observable Make an object reactive
 * @method defineAttributesPropertyGetter Dynamically defing getters and setters from options
 * @method defineAttributesProperty Dynamically defing enumerable property from options
 */
export default class ObservableMixin {
    /**
     * Add new properties to the objects
     * @param {Object} target
     * @param {String} key
     * @param {any} value
     */
    set(target, key, value) {
        target[key] = value;
        return value;
    }

    /**
     * Make an object reactive
     * @param {any} data
     */
    observable(data) {
        return data;
    }

    /**
     * Dynamically defing getters and setters from options
     * @return void
     */
    defineAttributesPropertyGetter(options) {
        const optionKeys = Object.keys(options);

        optionKeys.forEach(key => {
            if (!(key in this)) {
                Object.defineProperty(this, key, {
                    get() {
                        return options[key];
                    },
                    set(value) {
                        this.set(options, key, value);
                        return true;
                    },
                });
            }
        });
    }

    /**
     * Dynamically defing enumerable property from options
     * @return void
     */
    defineAttributesProperty(options) {
        const optionKeys = Object.keys(options);

        optionKeys.forEach(key => {
            if (!(key in this)) {
                Object.defineProperty(this, key, {
                    enumerable: true,
                    writable: true,
                    value: options[key],
                });
            }
        });
    }
}
