import { Method, ConfigurationObject } from './method';
import { Observable } from 'rxjs/Observable';

export function Get(config: string | ConfigurationObject) {
    return Method('get', config);
}
