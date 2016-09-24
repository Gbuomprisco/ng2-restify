import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class Cache {
    protected items = {};

	/**
     * - gets an item from the cache
     * @name get
     * @param item
     * @returns {any}
     */
    public get(item: string): Observable<any> {
        return this.items[item];
    }

	/**
     * - stores an item in the cache as an Observable
     * @name put
     * @param item
     * @param value
     */
    public put(item: string, value: any) {
        this.items[item] = Observable.of(value);
    }

	/**
     * @name invalidate
     * @param item
     */
    public invalidate(item: string): void {
        this.items[item] = undefined;
    }
}
