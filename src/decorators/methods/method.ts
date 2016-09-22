import configurator from '../../configurator';
import { Observable } from 'rxjs/Observable';
import { RequestOptionsBuilder } from '../../requestOptionsBuilder';

const Route = require('route-parser');

export function Method(method: string, config: any) {
    return (target: any, propertyKey: string) => {
        setPath(config, propertyKey);

        const configuration = configurator.getResourceConfig(propertyKey);

        return {
            value: function (params = {}): Observable<any> {
                const options = RequestOptionsBuilder(Object.assign(configuration, {
                    method,
                    baseUrl: this.baseUrl
                }), params);

                return this.request(options, configuration);
            }
        };
    };
}

function setPath(config: string | any,  methodName: string) {
    if (typeof config === 'string') {
        configurator.setResourceParameter('path', methodName, new Route(config));
    } else {
        configurator.setResourceParameter('path', methodName, new Route(config.path));
    }
}
