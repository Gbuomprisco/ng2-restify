import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class Cache {
    protected items = {};

    public get(item: string): Observable<any> {
        return this.items[item];
    }

    public put(item: string, value: any) {
        this.items[item] = Observable.of(value);
    }
}
