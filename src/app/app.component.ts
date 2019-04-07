import { Component } from '@angular/core';
import {User} from './user';
import {OnChanges} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'untitled';


  LetLogin() {
    return User.SuccessLogin;
  }
  getData(){
    return User.data;
  }

}
