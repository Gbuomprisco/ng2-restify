import { Method } from './method';
import { Observable } from 'rxjs/Observable';

export function Put(config: string) {
    return Method('put', config);
}
