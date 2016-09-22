export class Configurator {
    private configuration = {};

    public setResourceParameter(parameter: string, method: string, value: string) {
        this.configuration[method] = this.configuration[method] || {};
        this.configuration[method][parameter] = value;
    }

    public getResourceConfig(method: string) {
        return this.configuration[method];
    }
}
