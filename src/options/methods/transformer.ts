import { initialize } from '../../helpers/initializer';
import { RestifyProvider } from '../../ng2-restify';

/**
 *
 * @param transformer
 * @returns {(target:RestifyProvider, name:string)=>undefined}
 * @constructor
 */
export function TransformResponse(transformer: (params: any) => any) {
    return function(target: RestifyProvider, name: string) {
        initialize(target, name).setResourceParameter('transformer', name, transformer);
    };
}
