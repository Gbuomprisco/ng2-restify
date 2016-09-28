import { initialize } from '../../helpers/initializer';
import { RestifyProvider } from '../../ng2-restify';

/**
 *
 * @name ResponseType
 * @param responseType
 * @returns {(target:any, name:any)=>undefined}
 * @constructor
 */
export function ResponseType(responseType: string) {
    return function(target: RestifyProvider, name: string) {
        initialize(target, name).setResourceParameter('responseType', name, responseType);
    };
}
