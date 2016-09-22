import { Method } from './method';

export function Delete(config: string | any) {
    return Method('delete', config);
}
