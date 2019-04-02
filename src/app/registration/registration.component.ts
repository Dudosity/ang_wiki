import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {
  register;
  constructor(private RegUser: UserService) { }

  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: ''
    };
  }

  RegisterUser() {
    this.RegUser.registerNewUser(this.register).subscribe(
      response => {
        alert('User' + this.register.username + 'has been created!');
      },
      error => console.log('error', error)

    );

  }
}
