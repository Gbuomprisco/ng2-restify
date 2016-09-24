import { Http, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configurator } from './configurator';
import { Cache } from './cache';

import 'rxjs/add/operator/map';

export class RestifyProvider {
    public configurator: Configurator = new Configurator();

    protected cache: Cache =  new Cache();
    protected initialized: boolean;
    protected headers: {[name: string]: string};

    constructor(protected http: Http) {}

    protected request(options, config: any): Observable<any> {
        const req = new Request(new RequestOptions(options));
        const transformer = config.transformer;

        if (config.method === 'get') {
            const cached = this.cache.get(options.url);

            if (cached) {
                return cached;
            }
        }

        return this.http
            .request(req)
            .map(data => {
                const value = transformer ? transformer(data.json()) : data.json();

                if (config.cache) {
                    this.cache.put(options.url, value);
                }

                return value;
            });
    }
}
