import { Builder } from './builder';
import { RestifyProvider } from '../ng2-restify';
import { Observable } from 'rxjs/Observable';

export interface ConfigurationObject {
    path: string;
    cache?: boolean;
}

/**
 * - builds a method given its type and its configuration or URL path
 * @name Method
 * @param method
 * @param parameters
 * @returns {(target:any, propertyKey:string)=>{value: ((data?:{})=>Observable<any>)}}
 * @constructor
 */
export function Method(method: string, parameters: ConfigurationObject | string) {
    return (target: RestifyProvider, key: string) => Builder(target, method, key, parameters);
}

