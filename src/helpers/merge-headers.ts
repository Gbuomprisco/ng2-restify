import { Headers } from '@angular/http';

/**
 * @name mergeHeaders
 * @param universal
 * @param global
 * @param local
 * @returns {Headers}
 */
export function mergeHeaders(
        universal: Headers = new Headers(),
        global: Headers = new Headers(),
        local: Headers = new Headers()
) {

    const headers = new Headers();
    const merged = new Set(universal.keys().concat(global.keys()).concat(local.keys()));

    merged.forEach(header => {
        if (local.has(header)) {
            headers.append(header, local.get(header));
        } else if (global.has(header)) {
            headers.append(header, global.get(header));
        } else if (universal.has(header)) {
            headers.append(header, universal.get(header));
        }
    });

    return headers;
}
