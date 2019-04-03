import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  registerNewUser(userData): Observable<any> {

    return  this.http.post('http://127.0.0.1:8000/user_reg/',userData)
  }
  AuthUser(userData): Observable<any> {

    return  this.http.post('http://127.0.0.1:8000/auth/',userData)
  }
  GetTopicList(userData): Observable<any> {

    return  this.http.get('http://127.0.0.1:8000/user/', userData)
}

}
