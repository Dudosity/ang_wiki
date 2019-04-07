import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {and} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-article-block',
  templateUrl: './article-block.component.html',
  styleUrls: ['./article-block.component.css']
})
export class ArticleBlockComponent implements OnInit {
  articleText: any = 'Лох';
  New: boolean;
  constructor() { }

  ngOnInit() {
  }

  isNew(){
    this.New = User.NewTopic;
    return this.New;
  }
  ViewTopicText() {
    this.articleText = User.topic.articleText;
    return this.articleText;
  }
}
