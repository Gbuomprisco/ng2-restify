import { initialize } from '../../helpers/initializer';
import { RestifyProvider } from '../../ng2-restify';

/**
 * @name WithCredentials
 * @returns {(target:RestifyProvider, name:string)=>undefined}
 * @constructor
 */
export function WithCredentials() {
    return function(target: RestifyProvider, name: string) {
        initialize(target, name).setResourceParameter('withCredentials', name, true);
    };
}
