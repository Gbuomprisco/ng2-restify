import configurator from '../configurator';

export function TransformResponse(transformer) {
    return function(target, name) {
        configurator.setResourceParameter('transformer', name, transformer);
    };
}
