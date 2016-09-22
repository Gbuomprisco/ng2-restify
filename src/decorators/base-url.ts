export function BaseUrl(url: string) {
    return function(target) {
        target.prototype.baseUrl = url;
    };
}
