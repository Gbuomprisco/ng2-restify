import { Headers } from '@angular/http';


/**
 * @name GlobalHeaders
 * @param headers
 * @returns {(target:any)=>undefined}
 * @constructor
 */
export function GlobalHeaders(headers: {[name: string]: string}) {
    return function(target): void {
        target.prototype.headers = new Headers(headers);
    };
}
