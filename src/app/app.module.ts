import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { TopicListComponent } from './topic-list/topic-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import {UserService} from './user.service';
import { LoginComponent } from './login/login.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule, MatIconModule} from '@angular/material';
import { ArticleBlockComponent } from './article-block/article-block.component';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TopicListComponent,
    RegistrationComponent,
    LoginComponent,
    ArticleBlockComponent
  ],
  imports: [ BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTreeModule, MatIconModule, MatButtonModule, MatIconModule
  ],
  providers: [UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
