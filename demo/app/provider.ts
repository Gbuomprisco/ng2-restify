import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserTransformer } from './transformers/userTransformer';

import { RestifyProvider, BaseUrl, Path, Get, Post, TransformResponse } from '../../src';

@Injectable()
@BaseUrl('http://localhost:3001')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @Get
    @Path('/users')
    @TransformResponse(UserTransformer)
    public getUsers(): Observable<any> {return}

    @Get
    @Path('/users/:id')
    public getUserByid({id: number}): Observable<any> {return}

    @Post
    @Path('/users')
    public createUser(body?): Observable<any> {return}
}
