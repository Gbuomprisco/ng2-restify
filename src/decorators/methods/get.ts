import { Method, ConfigurationObject } from './method';

export function Get(config: string | ConfigurationObject): Method {
    return Method('get', config);
}
