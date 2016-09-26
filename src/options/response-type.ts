/**
 * @name ResponseType
 * @param responseType
 * @returns {(target:any, name:any)=>undefined}
 * @constructor
 */
export function ResponseType(responseType: string) {
    return function(target, name) {
        target.configurator.setResourceParameter('responseType', name, responseType);
    };
}
