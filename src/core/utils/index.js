/**
 * Assert if object is empty
 * @param {Object.<string, any>} value
 */
export function isObjectEmpty(value) {
    return Object.keys(value).length === 0;
}
