import { Http, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configurator } from './configurator';
import { Cache } from './cache';

import 'rxjs/add/operator/map';

export abstract class RestifyProvider {
    protected configurator: Configurator;
    protected cache: Cache;
    protected initialized: boolean;

    constructor(protected http: Http) {
        this.configurator = new Configurator();
        this.cache = new Cache();
    }

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
