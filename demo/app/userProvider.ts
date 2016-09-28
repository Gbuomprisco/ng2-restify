import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {
    RestifyProvider,
    BaseUrl,
    Get,
    Post,
    Put,
    Delete,
    Resource,
    Action
} from '../../src';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @Get({path: '/users/:id', cache: true})
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

@Injectable()
@BaseUrl('http://localhost:3000')
@Resource('/users/(:id)')
export class UsersProviderWithResource extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @Post()
    @Action('/profile')
    public getProfile(): Observable<any> {
        return;
    }
}
