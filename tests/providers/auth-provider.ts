import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {
    RestifyProvider,
    BaseUrl,
    Get,
    Post,
    WithCredentials,
    Retry,
    GlobalHeaders,
    LocalHeaders
} from '../../src';

@GlobalHeaders({
    'Content-Type': 'application/text'
})
@Injectable()
@BaseUrl('http://localhost:3000')
export class AuthProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @WithCredentials()
    @Post('/signin')
    public signIn(params): Observable<any> {
        return;
    }

    @Retry(5)
    @Post('/signup')
    public signUp(params): Observable<any> {
        return;
    }

    @LocalHeaders({
        'Authorization': 'Basic 123',
        'Content-Type': 'application/json'
    })
    @Get('/whoami')
    public whoAmI(): Observable<any> {
        return;
    }
}
