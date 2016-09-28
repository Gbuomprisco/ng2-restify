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
@Resource('/users')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }
}
