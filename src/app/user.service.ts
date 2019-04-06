import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  header;

  constructor(private http: HttpClient) {
    this.header = {
      headers: {
        Authorization: ''
      }
    };
  }
  registerNewUser(userData): Observable<any> {

    return  this.http.post('http://127.0.0.1:8000/user_reg/', userData);
  }
  AuthUser(userData): Observable<any> {

    return  this.http.post('http://127.0.0.1:8000/auth/', userData);
  }
  GetTopicList(userData): Observable<any> {

    return  this.http.get('http://127.0.0.1:8000/user/', userData);
}
  ShowTopic() {
    this.header.headers.Authorization = User.token;
    console.log(User.token);
    this.GetTopicList(this.header).subscribe(
      response => {
        console.log(response);
        User.data = response;
      },
      error => {console.log('error', error);
      }
    );

  }
}
