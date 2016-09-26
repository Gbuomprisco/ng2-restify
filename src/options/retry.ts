/**
 * @name Retry
 * @param times
 * @returns {(target:any, name:any)=>undefined}
 * @constructor
 */
export function Retry(times: number) {
    return function(target, name) {
        target.configurator.setResourceParameter('retry', name, times);
    };
}
