import { Method, ConfigurationObject } from '../helpers/method';
import { Observable } from 'rxjs/Observable';
import { RestifyProvider } from '../ng2-restify';

export function Get(config?: string | ConfigurationObject) {
    return Method('get', config || {path: ''});
}
