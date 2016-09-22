## ng2-restify

Tiny REST Framework for Angular 2

Example

'
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RestifyProvider, BaseUrl, Path, Get, Post } from '../../src';

@Injectable()
@BaseUrl('http://localhost:3001')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @Get
    @Path('/users')
    public getUsers(): Observable<any> {return}

    @Get
    @Path('/users/:id')
    public getUserByid({id: number}): Observable<any> {return}

    @Post
    @Path('/users')
    public createUser(body?): Observable<any> {return}
}
'
