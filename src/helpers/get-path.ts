import { ConfigurationObject } from './method';

/**
 * @name getPath
 * @param configuration
 * @param parameters
 * @returns {string}
 */
export function getPath(configuration: any, parameters: string | ConfigurationObject): string {
    let path: string = typeof parameters === 'string' ? parameters : parameters.path;

    if (configuration.action) {
        path += configuration.action;
    }

    return path;
}
