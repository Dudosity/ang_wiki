import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {TopicListComponent} from '../topic-list/topic-list.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  login;
  request: [];
  success: boolean;
  constructor(private Auth: UserService) { }

  ngOnInit() {
    this.login = {
      username: '',
      password: ''
    };
  }

  LoginUser() {
    console.log(this.login);
    this.Auth.AuthUser(this.login).subscribe(
      response => {
        // JSON.stringify(product) ;
        this.request = response;
        User.username = this.login.username;
        User.token = 'token ' + response.token;
        this.Auth.ShowTopic();
        User.SuccessLogin = true;
        this.success = true;
        //alert('User ' + this.login.username + ' has been login!' + this.request);
        console.log('Token = ' + User.token);
        console.log('SuccesLogin' + User.SuccessLogin);

      },
      error => console.log('error', error)

    );

  }
}
