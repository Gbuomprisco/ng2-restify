import { Observable } from 'rxjs/Observable';
import { RequestOptionsBuilder } from '../services/requestOptionsBuilder';
import { mergeHeaders } from '../options/headers';

const Route = require('route-parser');

export interface ConfigurationObject {
    path: string;
    cache?: boolean;
    withCredentials?: boolean;
}

/**
 * - builds a method given its type and its configuration or URL path
 * @name Method
 * @param method
 * @param parameters
 * @returns {(target:any, propertyKey:string)=>{value: ((data?:{})=>Observable<any>)}}
 * @constructor
 */
export function Method(method: string, parameters: ConfigurationObject | string) {
    if (!parameters) {
        throw new Error('Please provide a valid URL, or a valid configuration object');
    }

    return function(target: any, propertyKey: string) {
        initialize(target);

        target.configurator.setResourceParameter(
            'path',
            propertyKey,
            new Route(typeof parameters === 'string' ? parameters : parameters.path)
         );

        const configuration = target.configurator.getResourceConfig(propertyKey);

        return {
            value: function(data: {[key: string]: any} = {}): Observable<any> {
                const headers = mergeHeaders(
                    target.configurator.getUniversalHeaders(),
                    target.headers,
                    configuration.headers
                );

                const options = RequestOptionsBuilder(Object.assign({}, configuration, {
                    method,
                    baseUrl: this.baseUrl,
                    headers,
                    withCredentials: configuration.withCredentials
                }), data);

                const config = typeof parameters === 'string' ? configuration :
                    Object.assign(configuration, parameters);

                return this.request(options, config);
            }
        };
    };
}

/**
 * - initializes constructor
 * @name initialize
 * @param target
 */
function initialize(target) {
    if (!target.initialized) {
        target.constructor();
        target.initialized = true;
    }
}
