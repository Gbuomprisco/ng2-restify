import { UsersProvider } from './testing-helpers';
import { TestBed, inject } from '@angular/core/testing';

import { BaseRequestOptions, Response, ResponseOptions, Http, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('Ng2 Restify', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                UsersProvider,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions],
                },
            ],
        });
    });

    let BASE_URL = 'http://localhost:3000';
    let usersProvider;
    let backend;
    let http;

    beforeEach(inject([UsersProvider, MockBackend, Http],
        (_usersProvider: UsersProvider, _backend: MockBackend, _http: Http) => {
            usersProvider = _usersProvider;
            backend = _backend;
            http = _http;
    }));

    describe('Basic properties', () => {
        it('should have properties set', () => {
            expect(usersProvider.http).toBeDefined();
        });
    });

    describe('GET requests', () => {
        it('should perform a GET request to /users and cache response', done => {
            const response = { success: true };
            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: JSON.stringify(response)
                });

                expect(connection.request.url).toEqual(BASE_URL + '/users');
                expect(connection.request.method).toEqual(0);

                connection.mockRespond(new Response(options));
            });

            usersProvider.getUsers().subscribe(data => {
                expect(data).toEqual(response);

                // data is cached
                expect(usersProvider.cache.get(BASE_URL + '/users').value).toEqual(data);

                done();
            });
        });

        it('should perform a GET request to /users/3', done => {
            const response = {
                name: 'name',
                id: 3
            };

            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: JSON.stringify(response)
                });

                expect(connection.request.method).toEqual(0);
                expect(connection.request.url).toEqual(BASE_URL + '/users/3');

                connection.mockRespond(new Response(options));
            });

            usersProvider.getUserById({id: 3}).subscribe(data => {
                expect(data).toEqual(response);
                done();
            });
        });

        it('should perform a GET request to /users?name=myName', done => {
            const response = {
                name: 'name',
                id: 3
            };

            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: JSON.stringify(response)
                });

                expect(connection.request.method).toEqual(0);
                expect(connection.request.url).toEqual(BASE_URL + '/users?name=myName');

                connection.mockRespond(new Response(options));
            });

            usersProvider.getUserByName({name: 'myName'}).subscribe(data => {
                expect(data).toEqual(response);
                done();
            });
        });
    });

    describe('POST requests', () => {
        it('should perform a POST request to /users', done => {
            const response = {
                name: 'name',
                surname: 'surname'
            };

            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: JSON.stringify(response)
                });

                expect(connection.request.url).toEqual(BASE_URL + '/users');
                expect(connection.request.method).toEqual(1);

                connection.mockRespond(new Response(options));
            });

            usersProvider.createUser(response).subscribe(data => {
                expect(data).toEqual(response);
                done();
            });
        });
    });

    describe('PUT requests', () => {
        it('should perform a PUT request to /users', done => {
            const response = {
                name: 'name',
                surname: 'surname',
                id: 4
            };

            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: JSON.stringify({
                        name: 'name',
                        surname: 'surname2'
                    })
                });

                expect(connection.request.method).toEqual(2);
                expect(connection.request.url).toEqual(BASE_URL + '/users/4');

                connection.mockRespond(new Response(options));
            });

            usersProvider.updateUser(response).subscribe(data => {
                expect(data).toEqual({
                    name: 'name',
                    surname: 'surname2'
                });

                done();
            });
        });
    });

    describe('DELETE requests', () => {
        it('should perform a DELETE request to /users', done => {
            const response = {
                success: false
            };

            backend.connections.subscribe((connection: MockConnection) => {
                let options = new ResponseOptions({
                    body: JSON.stringify(response)
                });

                expect(connection.request.method).toEqual(3);
                expect(connection.request.url).toEqual(BASE_URL + '/users/10');

                connection.mockRespond(new Response(options));
            });

            usersProvider.deleteUser({id: 10}).subscribe(data => {
                expect(data).toEqual(response);
                done();
            });
        });
    });
});
