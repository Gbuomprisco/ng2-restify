import configurator from '../configurator';
const Route = require('route-parser');

export function Path(path: string) {
    return function(target, name, descriptor) {
        configurator.setResourceParameter('path', name, new Route(path));
    };
}
