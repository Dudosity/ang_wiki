import { Component, OnInit } from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'app-article-block',
  templateUrl: './article-block.component.html',
  styleUrls: ['./article-block.component.css']
})
export class ArticleBlockComponent implements OnInit {
  articleText: any = '' ;
  aricleAuthorName: any = '';
  aricleAuthorSurName: any = '';
  aricleAuthorUserName: any = '';
  articleName: any = '';
  isInput = false;
  New = false;
  constructor() { }

  ngOnInit() {
  }


  ViewTopicText() {
    if (User.topic !== undefined && !null) {
      this.articleText = User.topic.articleText;
      this.aricleAuthorName = User.topic.authorName;
      this.aricleAuthorSurName = User.topic.authorSurname;
      this.aricleAuthorUserName = User.topic.authorUsername;
      this.articleName = User.topic.articleName;
      // console.log('ArticleText  ', this.articleText);
      return this.New = true;
    }
  }

}
