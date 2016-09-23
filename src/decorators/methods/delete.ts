import { Method } from './method';

export function Delete(config: string) {
    return Method('delete', config);
}
