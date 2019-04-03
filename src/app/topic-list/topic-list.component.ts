import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  header;
  body;
  data: any;
  constructor(private ApiService: UserService) { }

  ngOnInit() {
    this.header = {
      headers: {
      Authorization:''
      }
    };
    this.body = {
      username:''
    };
  }

  ShowTopic() {
    this.body.username = User.username;
    this.header.headers.Authorization = User.token;
  this.ApiService.GetTopicList(this.header).subscribe(
    response => {
      this.data = JSON.stringify(response);
      console.log(response);

    },
    error => {console.log('error', error);
    this.data = error;

    }
  );
  }
}
