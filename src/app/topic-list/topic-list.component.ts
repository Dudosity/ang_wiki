import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  topic;
  data: any;
  constructor(private ApiService: UserService) { }

  ngOnInit() {
    this.topic = {
      username:'',
      Authorization:''
    };
  }

  ShowTopic() {
    this.topic.username = User.username;
    this.topic.Authorization = User.token;
  this.ApiService.GetTopicList(this.topic).subscribe(
    response => {
      this.data = response.json();


    },
    error => console.log('error', error)
  );
  }
}
