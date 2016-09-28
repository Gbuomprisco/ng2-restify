import { initialize } from '../../helpers/initializer';
import { RestifyProvider } from '../../ng2-restify';

/**
 * @name Action
 * @param name
 * @returns {(target:RestifyProvider, name:string)=>undefined}
 * @constructor
 */
export function Action(name: string) {
    return function(target: RestifyProvider, key: string) {
        initialize(target, key).setResourceParameter('action', key, name);
    };
}
