/**
 * @name WithCredentials
 * @returns {(target:any, name:any)=>undefined}
 * @constructor
 */
export function WithCredentials() {
    return function(target, name) {
        target.configurator.setResourceParameter('withCredentials', name, true);
    };
}
