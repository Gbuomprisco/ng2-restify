import {Component, OnInit} from '@angular/core';
import { UsersProvider, UsersProviderWithResource} from '../userProvider';

interface User {
    name: string;
    surname: string;
    id?: number;
}

@Component({
  selector: 'home',
  styles: [require('./home.css').toString()],
  template: require('./home.html')
})
export class Home implements OnInit {
    private users: User[] = [];
    private selectedUser: User;

    private model: User = {
        name: <string>undefined,
        surname: <string>undefined
    };

    constructor(private usersProvider: UsersProviderWithResource) {}

    public ngOnInit() {
        this.usersProvider
            .getProfile()
            .subscribe(profile => console.log(profile));

        this.usersProvider
           .get()
           .subscribe(users => this.users = users);
    }

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

    public selectUser(user) {
        this.selectedUser = user;
        this.model = Object.assign({}, user);
    }
}
