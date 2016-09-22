const Route = require('route-parser');
const configuration = {};

class Configurator {
    public setResourcePath(method: string, path: string) {
        configuration[method] = configuration[method] || {};
        configuration[method].path = new Route(path);
    }

    public getResourceConfig(method: string) {
        return configuration[method];
    }
}

const configurator = new Configurator();

export default configurator;
