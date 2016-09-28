import { ConfigurationObject } from './method';
const urlJoin = require('url-join');

/**
 * @name getPath
 * @param configuration
 * @param parameters
 * @returns {string}
 */
export function getPath(configuration: any, parameters: string | ConfigurationObject): string {
    let path: string = typeof parameters === 'string' ? parameters : parameters.path;

    if (configuration.action) {
        path = urlJoin(path, configuration.action);
    }

    return path;
}
