import { Headers } from '@angular/http';

const universalHeaders: Headers = new Headers();

export class Configurator {
    private configuration = {};

    public setResourceParameter(parameter: string, method: string, value: string) {
        this.configuration[method] = this.configuration[method] || {};
        this.configuration[method][parameter] = value;
    }

    public getResourceConfig(method: string) {
        return this.configuration[method];
    }

    public setUniversalHeaders(headers: {[name: string]: string}) {
        headers.forEach(header => {
            for (let name in header) {
                if (header.hasOwnProperty(name)) {
                    universalHeaders.append(name, header[name]);
                }
            }
        });
    }

    public getUniversalHeaders(): Headers {
        return universalHeaders;
    }
}
