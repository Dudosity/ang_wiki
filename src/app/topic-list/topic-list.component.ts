import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';


@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  constructor(private ApiService: UserService) { }
  topic: any;
  ngOnInit() {
    this.topic = User.data;

    console.log(User.data);
  }

}
