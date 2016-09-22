const configuration = {};

class Configurator {
    public setResourceParameter(parameter: string, method: string, value: string) {
        configuration[method] = configuration[method] || {};
        configuration[method][parameter] = value;
    }

    public getResourceConfig(method: string) {
        return configuration[method];
    }
}

const configurator = new Configurator();

export default configurator;
