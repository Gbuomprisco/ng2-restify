import { Method } from '../helpers/method';
import { Observable } from 'rxjs/Observable';
import { RestifyProvider } from '../ng2-restify';

export function Post(config: string = '') {
    return Method('post', config);
}
