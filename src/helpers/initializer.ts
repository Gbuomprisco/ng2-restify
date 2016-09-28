import { RestifyProvider } from '../ng2-restify';
import { Configurator } from '../services/configurator';

/**
* - initializes constructor
* @name initialize
* @param propertyKey
* @param target
*/
export function initialize(target: RestifyProvider, propertyKey: string): Configurator {
    if (!target.initialized) {
        target.constructor();
        target.initialized = true;
    }

    // create and get configuration
    return target
        .configurator
        .createResource(propertyKey);
}
