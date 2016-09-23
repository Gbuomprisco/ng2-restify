import { Method, ConfigurationObject } from './method';

export function Get(config: string | ConfigurationObject) {
    return Method('get', config);
}
