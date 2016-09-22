import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserTransformer } from './transformers/userTransformer';

import { RestifyProvider, BaseUrl, Get, Post, TransformResponse } from '../../src';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @TransformResponse(UserTransformer)
    @Get('/users')
    public getUsers(): Observable<any> {return}

    @Get({path: '/users/:id', cache: true})
    public getUserByid({id: number}): Observable<any> {return}

    @Post('/users')
    public createUser(body?): Observable<any> {return}
}
