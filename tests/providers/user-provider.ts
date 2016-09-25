import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RestifyProvider, BaseUrl, Get, Post, Put, Delete } from '../../src';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @Get({path: '/users', cache: true})
    public getUsers(): Observable<any> {
        return;
    }

    @Get({path: '/users/:id', cache: true})
    public getUserById(params: {id: number}): Observable<any> {
        return;
    }

    @Get('/users?name=(:name)')
    public getUserByName(params: {name: string}): Observable<any> {
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
