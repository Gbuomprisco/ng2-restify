import { Http, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export abstract class RestifyProvider {
    constructor(protected http: Http) {}

    public request(options, transformer: (val: any) => any): Observable<any> {
        const req = new Request(new RequestOptions(options));

        return this.http
            .request(req)
            .map(val => transformer ? transformer(val.json()) : val.json());
    }
}
