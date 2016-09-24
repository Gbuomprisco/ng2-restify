/**
 * - sets the base URL for the whole provider
 * @name BaseUrl
 * @param url
 * @returns {(target:any)=>undefined}
 * @constructor
 */
export function BaseUrl(url: string) {
    return function(target) {
        target.prototype.baseUrl = url;
    };
}
