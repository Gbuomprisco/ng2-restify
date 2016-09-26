import { Method } from './method';
import { Observable } from 'rxjs/Observable';

export function Delete(config: string) {
    return Method('delete', config);
}
