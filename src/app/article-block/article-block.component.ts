import {Component, NgModule, OnInit} from '@angular/core';
import {User} from '../user';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {HttpClientModule} from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {FormsModule} from '@angular/forms';
import {UserService} from '../user.service';

@Component({
  selector: 'app-article-block',
  templateUrl: './article-block.component.html',
  styleUrls: ['./article-block.component.css']
})


export class ArticleBlockComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '60vh',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'yes',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
  itemConfig = {
    headers: {
      Authorization: ''
    }
  };
  articleText = '' ;
  aricleAuthorName: any = '';
  aricleAuthorSurName: any = '';
  aricleAuthorUserName: any = '';
  articleName: any = '';
  articleId: any = '';
  isInput = false;
  New = true;
  article;
  constructor(private service:UserService) { }

  ngOnInit() {
    this.article = {
      desc:'',
      thread:'',

    }
  }


  ViewTopicText() {
    if (User.topic !== undefined && !null && User.NewTopic) {
      //this.articleText = User.topic.articleText;
      this.aricleAuthorName = User.topic.authorName;
      this.aricleAuthorSurName = User.topic.authorSurname;
      this.aricleAuthorUserName = User.topic.authorUsername;
      this.articleName = User.topic.articleName;
      this.articleId = User.topic.articleId;
      this.article.thread = User.topic.threadId;
      // console.log('ArticleText  ', this.articleText);
      return User.NewTopic;
      User.NewTopic = false;
    }
  }

  UpdateArticle() {
    console.log(this.articleText);
    this.article.desc = this.articleText;
    this.itemConfig.headers.Authorization = User.token;
    this.service.UpdateArticle(this.articleId, this.article, this.itemConfig).subscribe(
      response => {
        console.log('UpdateArticle ', response);
      },
         error => console.log('error', error)
    )
  }
}
