import configurator from '../configurator';

export function Path(path: string) {
    return function(target, name, descriptor) {
        configurator.setResourcePath(name, path);
    };
}
