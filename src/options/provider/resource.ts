/**
 * - sets the base URL for the whole provider
 * @name Resource
 * @param path
 * @returns {(target:any)=>undefined}
 * @constructor
 */
export function Resource(path: string) {
    return function(target) {
        target.prototype.resource = path;
        target.prototype.createActions();
    };
}
