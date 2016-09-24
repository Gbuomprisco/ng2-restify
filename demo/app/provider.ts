import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserTransformer } from './transformers/userTransformer';

import {
    RestifyProvider,
    BaseUrl,
    Get,
    Post,
    Put,
    Delete,
    TransformResponse,
    GlobalHeaders,
    LocalHeaders
} from '../../src';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @TransformResponse(UserTransformer)
    @Get({path: '/users', cache: true})
    public getUsers(): Observable<any> {
        return;
    }

    @Post('/users')
    public createUser(user): Observable<any> {
        return;
    }

    @Put('/users/:id')
    public updateUser(user): Observable<any> {
        return;
    }

    @Delete('/users/:id')
    public deleteUser(params: {id: number}): Observable<any> {
        return;
    }
}
