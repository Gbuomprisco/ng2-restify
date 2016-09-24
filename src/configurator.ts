import { Headers } from '@angular/http';

const universalHeaders: Headers = new Headers();

export class Configurator {
    private configuration = {};

	/**
     * - sets a parameter (name, value) for a method
     * @name setResourceParameter
     * @param parameter
     * @param method
     * @param value
     */
    public setResourceParameter(parameter: string, method: string, value: string) {
        this.configuration[method] = this.configuration[method] || {};
        this.configuration[method][parameter] = value;
    }

	/**
     * @name getResourceConfig
     * @param method
     * @returns {any}
     */
    public getResourceConfig(method: string) {
        return this.configuration[method];
    }

	/**
     * - appends new headers to the universal headers configuration
     * @name setUniversalHeaders
     * @param headers
     */
    public setUniversalHeaders(headers: {[name: string]: string}[]) {
        headers.forEach(header => {
            for (let name in header) {
                if (header.hasOwnProperty(name)) {
                    universalHeaders.append(name, header[name]);
                }
            }
        });
    }

	/**
     * @name getUniversalHeaders
     * @returns {Headers}
     */
    public getUniversalHeaders(): Headers {
        return universalHeaders;
    }
}
