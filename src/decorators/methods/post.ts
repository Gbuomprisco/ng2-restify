import { Method } from './method';

export function Post(config: string) {
    return Method('post', config);
}
