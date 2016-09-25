import { ResponseContentType } from '@angular/http';

/**
 * @name setResponseType
 * @param responseType {String}
 * @returns {ResponseContentType}
 */
export default function setResponseType(responseType?: string): ResponseContentType {
    switch (responseType) {
        case 'json':
            return ResponseContentType.Json;
        case 'text':
            return ResponseContentType.Text;
        case 'blob':
            return ResponseContentType.Blob;
        case 'arraybuffer':
            return ResponseContentType.Blob;
        default:
            return ResponseContentType.Json;
    }
}
