import { Method } from './method';

export function Put(config: string | any) {
    return Method('put', config);
}
