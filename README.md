# ng2-restify

## Tiny REST Framework for Angular 2

This is still very basic and experimental, package is not on NPM yet.

Example

    import { Injectable } from '@angular/core';
    import { Http } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import { UserTransformer } from './transformers/userTransformer';
    
    import { RestifyProvider, BaseUrl, Get, Post, TransformResponse } from ng2-restify';
    
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
    
    export class MyComponent {
        constructor(private usersProvider: UsersProvider) {}
        
        ngOnInit() {
          this.usersProvider.getUsers().subscribe(...); // will call GET /users
          
          this.usersProvider.getUserById({id; 3}).subscribe(...); // will call GET /users/3
        }
    
    }
