import configurator from '../configurator';
import { Observable } from 'rxjs/Observable';
const Route = require('route-parser');

export function Post(target, propertyKey) {
    const config = configurator.getResourceConfig(propertyKey);

    return {
        value: function(data): Observable<any> {
            const options = {url: this.baseUrl + config.path.reverse(data), method: 'get'};
            return this.request(options, config.transformer);
        }
    };
}
