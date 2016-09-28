import { Http, Request, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configurator } from './services/configurator';
import { Cache } from './services/cache';
import { Builder } from './helpers/builder';
import { METHODS_MAP } from './helpers/methods-map';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

export class RestifyProvider {
    public configurator: Configurator = new Configurator();
    public headers: Headers;
    public initialized: boolean;

    public get: (params?: any) => Observable<any>;
    public save: (params?: any) => Observable<any>;
    public update: (params?: any) => Observable<any>;
    public delete: (params?: any) => Observable<any>;

    protected resource: string;
    protected cache: Cache = new Cache();
    protected baseUrl: string;

    constructor(protected http: Http) {}

	/**
     * @name request
     * @param options
     * @param config
     * @returns {Observable}
     */
    protected request(options, config: any): Observable<any> {
        const req = new Request(new RequestOptions(options));
        const transformer = config.transformer;
        const retry = config.retry;

        if (config.method === 'get') {
            const cached = this.cache.get(config.path);

            if (cached) {
                return cached;
            }
        }

        return this.http
            .request(req)
            .map(data => {
                const value = transformer ? transformer(data) : data.json();

                if (config.cache) {
                    this.cache.put(config.path, value);
                }

                return value;
            })
            .retry(retry || 1);
    }

	/**
     * - generates methods when @Resource is called
     * @name createResourceMethods
     */
    private createResourceMethods(): void {
        const target = this;
        Object.keys(METHODS_MAP).forEach(method => {
            const action = Builder(target, method, METHODS_MAP[method], { path: target.resource }).value;

            Object.assign(target, {
                [METHODS_MAP[method]]: action
            });
        });
    }

    /**
     * @name invalidate
     * @param key
     */
    public invalidate(key: string): void {
        this.cache.invalidate(key);
    }
}
