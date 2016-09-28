import { URLSearchParams } from '@angular/http';

export declare interface QueryParams {
    [name: string]: string;
}


/**
 * @name setQueryParams
 * @param params {Params}
 * @param matchedParams {Params}
 * @returns {URLSearchParams}
 */
export function setQueryParams(params: QueryParams, matchedParams: QueryParams): URLSearchParams {
    const query = new URLSearchParams();

    for (let parameter in params) {
        if (params.hasOwnProperty(parameter) && !matchedParams.hasOwnProperty(parameter)) {
            query.append(parameter, params[parameter]);
        }
    }

    return query;
}
