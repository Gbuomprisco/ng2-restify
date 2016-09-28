import { Headers } from '@angular/http';

const universalHeaders: Headers = new Headers();

export class Configurator {
    private configuration = {};

    public createResource(method: string): Configurator {
        this.configuration[method] = this.configuration[method] || {};
        return this;
    }

	/**
     * - sets a parameter (name, value) for a method
     * @name setResourceParameter
     * @param parameter
     * @param method
     * @param value
     */
    public setResourceParameter(parameter: string, method: string, value: any): Configurator {
        this.configuration[method] = this.configuration[method] || this.createResource(method).getResourceConfig(method);
        this.configuration[method][parameter] = value;

        return this;
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
    public setUniversalHeaders(headers: {[name: string]: string}[]): Configurator {
        headers.forEach(header => {
            for (let name in header) {
                if (header.hasOwnProperty(name)) {
                    universalHeaders.append(name, header[name]);
                }
            }
        });

        return this;
    }

	/**
     * @name getUniversalHeaders
     * @returns {Headers}
     */
    public getUniversalHeaders(): Headers {
        return universalHeaders;
    }
}
