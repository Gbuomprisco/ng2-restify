import { initialize } from '../../helpers/initializer';
import { RestifyProvider } from '../../ng2-restify';

/**
 * @name Retry
 * @param times
 * @returns {(target:any, name:any)=>undefined}
 * @constructor
 */
export function Retry(times: number) {
    return function(target: RestifyProvider, name: string) {
        initialize(target, name).setResourceParameter('retry', name, times);
    };
}
