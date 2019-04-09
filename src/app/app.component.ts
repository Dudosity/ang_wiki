import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {OnChanges} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'untitled';
  loading: boolean;
  LetLogin() {
    this.loading = User.data;
    return this.loading;
  }
  getData() {
    return User.data;
  }

  ngOnInit(): void {
    this.loading = User.SuccessLogin;
  }

}
