import { Observable } from 'rxjs/Observable';
import { RequestOptionsBuilder } from '../../requestOptionsBuilder';

const Route = require('route-parser');

export interface ConfigurationObject {
    path: string;
    cache?: boolean;
}

export function Method(method: string, parameters: string | ConfigurationObject) {
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
            value: function (data = {}): Observable<any> {
                const options = RequestOptionsBuilder(Object.assign(configuration, {
                    method,
                    baseUrl: this.baseUrl
                }), data);

                const config = typeof parameters === 'string' ? configuration :
                    Object.assign(configuration, parameters);

                return this.request(options, config);
            }
        };
    };
}


function initialize(target) {
    if (!target.initialized) {
        target.constructor();
        target.initialized = true;
    }
}
