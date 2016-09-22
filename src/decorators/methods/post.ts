import { Method } from './method';

export function Post(config: string | any) {
    return Method('post', config);
}
