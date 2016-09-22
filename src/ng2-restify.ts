import { Http, Request, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export abstract class RestifyProvider {
    constructor(protected http: Http) {}

    public request(options, transformer: (val: any) => any): Observable<any> {
        const requestOptions: RequestOptions = new RequestOptions(options);
        const req = new Request(options);

        return this.http
            .request(req)
            .map(val => transformer ? transformer(val) : val);
    }
}
