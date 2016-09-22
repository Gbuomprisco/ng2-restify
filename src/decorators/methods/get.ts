import { Method } from './method';

export function Get(config: string | any) {
    return Method('get', config);
}
