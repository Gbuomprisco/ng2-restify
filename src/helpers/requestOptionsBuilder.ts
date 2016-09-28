import { RequestOptions } from '@angular/http';

import { QueryParams, setQueryParams } from './setQueryParams';
import setResponseType from './setResponseType';

const urlJoin = require('url-join');

/**
 * @name RequestOptionsBuilder
 * @param config
 * @param params
 * @returns {RequestOptions}
 * @constructor
 */
export function RequestOptionsBuilder(config: any, params: any): RequestOptions {
    const path = config.path.reverse(params);
    const paramsMatched = config.path.match(path);

    if (!path) {
        throw new Error(`The parameters ${JSON.stringify(params)} 
            do not match the Route provided ${config.path.spec}`);
    }

    const url = urlJoin(config.baseUrl, path);
    const headers = config.headers || {};
    const search = config.method === 'get' ? setQueryParams(params, paramsMatched) : undefined;
    const responseType = setResponseType(config.responseType);

    return Object.assign({}, {
        url,
        method: config.method,
        headers,
        body: params,
        search,
        withCredentials: config.withCredentials,
        responseType
    }, headers);
}
