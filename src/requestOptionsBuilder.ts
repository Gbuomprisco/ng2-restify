import { RequestOptions, ResponseContentType } from '@angular/http';

export function RequestOptionsBuilder(config: any, params: any): RequestOptions {
    const url = config.baseUrl + config.path.reverse(params);
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
