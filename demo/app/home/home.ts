import {Component} from '@angular/core';
import {UsersProvider} from '../provider';

@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home {
    constructor(private usersProvider: UsersProvider) {
        this.usersProvider.getUsers().subscribe(data => {
            console.log(data);
        });

        this.usersProvider.createUser({name: "Giancarlo"}).subscribe(data => {
            console.log(data);
        });

        this.usersProvider.getUserByid({id: 3}).subscribe(data => {
            console.log(data);
        });
    }
}
