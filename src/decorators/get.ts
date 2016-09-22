import configurator from '../configurator';
import { Observable } from 'rxjs/Observable';

export function Get(target, propertyKey) {
    const config = configurator.getResourceConfig(propertyKey);

    return {
        value: function(params = {}): Observable<any> {
            const options = {url: this.baseUrl + config.path.reverse(params), method: 'get'};
            return this.request(options);
        }
    };
}
