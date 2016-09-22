export function TransformResponse(transformer) {
    return function(target, name) {
        target.configurator.setResourceParameter('transformer', name, transformer);
    };
}
