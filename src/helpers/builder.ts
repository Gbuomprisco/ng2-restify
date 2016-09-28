import { ConfigurationObject } from './method';
import { RequestOptionsBuilder } from './requestOptionsBuilder';
import { mergeHeaders } from './merge-headers';
import { Observable } from 'rxjs/Observable';
import { RestifyProvider } from '../ng2-restify';
import { initialize } from './initializer';
import { getPath } from './get-path';

const Route = require('route-parser');

/**
 * @name Builder
 * @param target {RestifyProvider}
 * @param method {String}
 * @param propertyKey {String}
 * @param parameters {Object}
 * @returns {{value: ((data?:{})=>Observable<any>)}}
 * @constructor
 */
export function Builder(
    target: RestifyProvider,
    method: string,
    propertyKey: string,
    parameters: ConfigurationObject | string
) {
    // initialize constructor if not done already
    const configuration = initialize(target, propertyKey).getResourceConfig(propertyKey);
    const isConfigAnObject = typeof parameters !== 'string';

    configuration.path = new Route(getPath(configuration, parameters));

    return {
        value: function(data: {[key: string]: any} = {}): Observable<any> {

            // merge headers
            const headers = mergeHeaders(
                target.configurator.getUniversalHeaders(),
                target.headers,
                configuration.headers
            );

            // create RequestOptions
            const options = RequestOptionsBuilder(Object.assign({}, configuration, {
                method,
                baseUrl: this.baseUrl,
                headers,
                withCredentials: configuration.withCredentials
            }), data);

            // return Observable
            return this.request(options, isConfigAnObject ? Object.assign({}, configuration, parameters) : configuration);
        }
    };
}
