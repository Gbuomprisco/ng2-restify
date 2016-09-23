import {Component, OnInit} from '@angular/core';
import {UsersProvider} from '../provider';

interface User {
    name: string;
    surname: string;
    id?: number;
}

@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home implements OnInit {
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
