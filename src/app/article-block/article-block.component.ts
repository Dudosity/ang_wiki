import {Component, NgModule, OnInit} from '@angular/core';
import {User} from '../user';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {HttpClientModule} from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-article-block',
  templateUrl: './article-block.component.html',
  styleUrls: ['./article-block.component.css']
})


export class ArticleBlockComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
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
