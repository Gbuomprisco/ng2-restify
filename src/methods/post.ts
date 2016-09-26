import { Method } from './method';
import { Observable } from 'rxjs/Observable';

export function Post(config: string) {
    return Method('post', config);
}
