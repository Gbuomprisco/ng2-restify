# ng2-restify [![Build Status](https://travis-ci.org/Gbuomprisco/ng2-restify.svg?branch=master)](https://travis-ci.org/Gbuomprisco/ng2-restify)

### Tiny REST Framework for Angular 2

This is still very basic and experimental, package is not on NPM yet.

At the moment, this library supports requests for GET, POST, PUT and DELETE.

Features:
- Set up RESTful providers on the fly
- Set up universal, global and local headers for your requests
- Set up Response Transformers
- GET requests caching

### Example

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

## Set up Headers

#### Universal Headers (valid for all requests done via `RestifyProvider`)

You will need to import the `RestifyProvider` and set up the headers with `configurator.setUniversalHeaders`.

```javascript
@Component({
  selector   : 'app',
  templateUrl: './app.html',
})
export class AppComponent {
    constructor(private restify: RestifyProvider) {
        restify.configurator.setUniversalHeaders([{
            'Authorization': 'Basic 123'
        }]);
    }
}

// be aware you will also need to import the ResitfyProvider in your module

@NgModule({
  providers:[UsersProvider,
    {
        provide: RestifyProvider,
        useFactory: (http: Http) => {
            return new RestifyProvider(http);
        },
        deps: [Http]
    }
  ],
  bootstrap: [AppComponent]
})
```

#### Global Headers (valid for the `provider` they're used with)

```javascript
import {
    RestifyProvider,
    GlobalHeaders
} from 'ng2-restify';

@Injectable()
@BaseUrl('http://localhost:3000')
@GlobalHeaders({
    'Content-Type': 'application/json',
    'Authorization: 'Basic YnBjxDpib43q'
})
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }
}
```

#### Local Headers (valid for the `method` they're used with)

```javascript
import {
    RestifyProvider,
    Get,
    LocalHeaders
} from 'ng2-restify';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }
    
    @LocalHeaders({
        'Content-Type': 'application/text'
    })
    @Get('/users')
    public getUsers(): Observable<Users> { return; }
}  
```