# ng2-restify

## Tiny REST Framework for Angular 2

This is still very basic and experimental, package is not on NPM yet.

**Example**:

```javascript
// provider
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
    TransformResponse
} from 'ng2-restify';

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

// component
export class MyComponent {
constructor(private usersProvider: UsersProvider) {}

private users: User[] = [];
    private selectedUser: User;

    private model: User = {
        name: <string>undefined,
        surname: <string>undefined
    };

    constructor(private usersProvider: UsersProvider) {}

    public ngOnInit() {
       this.usersProvider
           .getUsers()
           .subscribe(users => this.users = users);
    }

    private createUser() {
        const {name, surname} = this.model;

        this.usersProvider
            .createUser({name, surname})
            .subscribe(data => {
                this.users.push(data);
            });
    }

    public submit() {
        if (this.selectedUser) {
            this.updateUser();
        } else {
            this.createUser();
        }
    }

    public updateUser() {
        const {name, surname} = this.model;

        this.selectedUser = Object.assign({}, this.selectedUser, {
            name,
            surname
        });

        this.usersProvider
            .updateUser(this.selectedUser)
            .subscribe(user => {
                const index = this.users.findIndex(user => this.selectedUser.id === user.id);
                this.users[index] = user;
            });
    }

    public deleteUser(id: number) {
        this.usersProvider
            .deleteUser({id})
            .subscribe(user => {
                const index = this.users.findIndex(user => this.selectedUser.id === user.id);
                this.users.splice(index, 1);
            });
    }

    public selectUser(user: User) {
        this.selectedUser = user;
        this.model = Object.assign({}, user);
    }
}
```
