import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {TopicListComponent} from '../topic-list/topic-list.component';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private Auth: UserService, private  CookieServ: CookieService) { }

  ngOnInit() {
    this.login = {
      username: '',
      password: '',
      remember: ''
    };
    console.log('КУКИ', this.CookieServ.get('login'));
    if (this.CookieServ.get('remember') == 'true') {
      this.success = true;
      User.SuccessLogin = true;
      this.login.username = this.CookieServ.get('login');
      this.login.password = this.CookieServ.get('pas');
      this.LoginUser();
    }
  }

  LoginUser() {
    console.log('REMEMBER', this.login.remember);
    this.Auth.AuthUser(this.login).subscribe(
      response => {
        // JSON.stringify(product) ;
        this.request = response;
        User.username = this.login.username;
        User.token = 'token ' + response.token;
        this.Auth.ShowTopic();
        User.SuccessLogin = true;
        this.success = true;
        // alert('User ' + this.login.username + ' has been login!' + this.request);
        console.log('Token = ' + User.token);
        console.log('SuccesLogin' + User.SuccessLogin);
        if (this.login.remember) {
          this.CookieServ.set('remember', this.login.remember);
          this.CookieServ.set('login', this.login.username);
          this.CookieServ.set('pas', this.login.password);
        }

      },
      error => console.log('error', error)

    );

  }


}
