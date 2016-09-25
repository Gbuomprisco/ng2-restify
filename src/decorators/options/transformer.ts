/**
 *
 * @param transformer
 * @returns {(target:any, name:any)=>undefined}
 * @constructor
 */
export function TransformResponse(transformer: (params: any) => any) {
    return function(target, name) {
        target.configurator.setResourceParameter('transformer', name, transformer);
    };
}
