import { RequestOptions, ResponseContentType } from '@angular/http';

export function RequestOptionsBuilder(config: any, params: any): RequestOptions {
    const path = config.path.reverse(params);

    if (!path) {
        throw new Error(`The parameters ${JSON.stringify(params)} do not match the Route provided ${config.path.spec}`);
    }

    const url = config.baseUrl + path;
    const headers = config.headers || {};

    return Object.assign({
        url,
        method: config.method,
        headers,
        body: params,
        search: undefined,
        withCredentials: undefined,
        merge: undefined,
        responseType: <ResponseContentType>1
    }, headers);
}
