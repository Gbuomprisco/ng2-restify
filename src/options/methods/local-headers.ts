import { Headers } from '@angular/http';
import { initialize } from '../../helpers/initializer';
import { RestifyProvider } from '../../ng2-restify';

/**
 * @name LocalHeaders
 * @param headers
 * @returns {(target:any, name:string)=>undefined}
 * @constructor
 */
export function LocalHeaders(headers: {[name: string]: string}) {
    return function(target: RestifyProvider, name: string): void {
        initialize(target, name).setResourceParameter('headers', name, new Headers(headers));
    };
}
