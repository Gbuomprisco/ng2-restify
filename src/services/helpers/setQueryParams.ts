import { URLSearchParams } from '@angular/http';

interface Params {
    [name: string]: string;
}

/**
 * @name setQueryParams
 * @param params {Params}
 * @param matchedParams {Params}
 * @returns {URLSearchParams}
 */
export default function setQueryParams(params: Params, matchedParams: Params): URLSearchParams {
    const query = new URLSearchParams();

    for (let parameter in params) {
        if (params.hasOwnProperty(parameter) && !matchedParams.hasOwnProperty(parameter)) {
            query.append(parameter, params[parameter]);
        }
    }

    return query;
}
