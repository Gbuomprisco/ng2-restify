# ng2-restify [![Build Status](https://travis-ci.org/Gbuomprisco/ng2-restify.svg?branch=master)](https://travis-ci.org/Gbuomprisco/ng2-restify)

### Tiny REST Provider for Angular 2

**This is still very basic and experimental. I do not recommend using it in production.**

#### What this provider does
- Set up RESTful providers on the fly
- Set up universal, global and local headers for your requests
- Set up Response Transformers
- GET requests caching

#### What this provider doesn't do
At the moment, this library supports requests for GET, POST, PUT and DELETE.

Support for JSON, HEAD and PATCH is planned.

## How to install it
Just run in your terminal:

    npm install ng2-restify --save

## Set provider up
Suppose you're setting up the library in your component `AppComponent`: 

```javascript
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

### Example

##### Create a Provider
The provider needs to extend `RestifyProvider`. Set it as follows:

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
```

##### Create a Component that uses `RestifyProvider`
```javascript
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
            .createUser({name, surname}) // (or save, if using @Resource)
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

## Further Options

### Headers

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
    'Authorization': 'Basic YnBjxDpib43q'
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

#### Retry
Set the number of times a request should be retried if throwing an error. By default it is 1.

```javascript
import {
    RestifyProvider,
    Get,
    Retry
} from 'ng2-restify';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }
    
    @Retry(3)
    @Get('/users')
    public getUsers(): Observable<Users> { return; }
}  
```

#### WithCredentials
Set the withCredentials header in the request.

```javascript
import {
    RestifyProvider,
    Post,
    WithCredentials
} from 'ng2-restify';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }
    
    @WithCredentials()
    @Post('/login')
    public login(creds): Observable<Users> { return; }
}  
```

#### ResponseType
Set the withCredentials flag in the request.

```javascript
import {
    RestifyProvider,
    Get,
    ResponseType
} from 'ng2-restify';

@Injectable()
@BaseUrl('http://localhost:3000')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }
    
    @ResponseType('text')
    @Post('/user')
    public createUser(user): Observable<Users> { return; }
}  
```

#### Resource and Action

Let's rewrite the first example using @Resource (and @Action, optionally):

This is our `UsersProvider`:

```javascript

//...imports...

@Injectable()
@BaseUrl('http://localhost:3000')
@Resource('/users/(:id)')
export class UsersProvider extends RestifyProvider {
    constructor(public http: Http) {
        super(http);
    }

    @Get()
    @Action('/profile')
    public getProfile(): Observable<any> {
        return;
    }
}
```

This is the body of our component. As you can, I replaced `createUser` with `save`,
`deleteUser` with `delete`, `updateUser` with `update` and finally `getUser` with `get`.

Indeed, if you specify the `@Resource` path (and eventual optional path segments), the provider is populated
with these 4 methods built in, which is easy and quick for non-complex providers.

```javascript
// imports...
// @Component...

private createUser() {
    const {name, surname} = this.model;

    this.usersProvider
        .save({name, surname})
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
        .update(this.selectedUser)
        .subscribe(user => {
            const index = this.users.findIndex(user => this.selectedUser.id === user.id);
            this.users[index] = user;
        });
}

public deleteUser(id: number) {
    this.usersProvider
        .delete({id})
        .subscribe(user => {
            const index = this.users.findIndex(user => this.selectedUser.id === user.id);
            this.users.splice(index, 1);
        });
}
```

### Routes Syntax
Under the hood, `ng2-restify` uses the great library [Route Parser](https://github.com/rcs/route-parser). Please have a look at it to know how to define your routes.

### TODO:
- Add PATCH, HEAD and JSONP methods
- Define default parameters value for methods
- ... Please open an issue for feature requests/bugs