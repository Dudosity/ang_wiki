import {Component, NgModule, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatIconModule} from '@angular/material/icon';
import { MatIconRegistry} from '@angular/material';
import {ArticleBlockComponent} from '../article-block/article-block.component';
import {MatDivider} from '@angular/material';

interface FoodNode {
  type: string;
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
@NgModule({

    imports: [MatExpansionModule,
      MatTreeModule,
      NestedTreeControl,
      MatTreeNestedDataSource,
      MatIconModule,
      MatIconRegistry
    ],

})
export class TopicListComponent implements OnInit {
  constructor(private topics: UserService) {
  }
  id = 0;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource();

  company;
  visibility: boolean[] = [];

  ngOnInit() {
    console.log(JSON.stringify(User.data));
    this.company = {
      title: '',
      description: '',
      owner: '',
      threads: null
    };
    this.dataSource.data = this.parse(User.data);
  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  parse(json: any) {
    this.id = 0;
    const item: any = [];
    for (const comp of json[0].company) {
      const compElement: any = {
        type: 'Thread',
        elementId: this.id ++,
        name: comp.title,
        children: []
      };
      item.push(compElement);
      for (const thread of comp.threads) {
        const threadElement: any = {
          type: 'Article',
          elementId: this.id ++,
          name: thread.title,
          children: []
        };
        item[item.indexOf(compElement)].children.push(threadElement);
        for (const art of thread.articles) {
          item[
            item.indexOf(compElement)
            ]
            .children[
              item[
                item.indexOf(compElement)
                ]
              .children.indexOf(threadElement)
            ].children.push({
            // type: 'Article',
            elementId: this.id ++,
            name: art.title,
            id: art.id});
        }
      }

    }

    for(var i = 0; i < this.id; i++){
      this.visibility[i] = true;
    }
    /*
    //Вариант Сереги
    for (const comp of json[0].company) {
      this.item.push({
        name: comp.title,
        children: []
      });
      this.j = 0;
      for (const thread of comp.threads) {
        this.item[this.i].children.push(
          {
            name: thread.title,
            children: []
          }
        );
        for (const art of thread.articles) {
          console.log(this.j);
          this.item[this.i].children[this.j].children.push({
              name: art.title,
            }
          );
        }
        this.j ++;
      }
      this.i ++;
    }
    console.log('Смотри сюда ', this.item);
  }
     */
    console.log('ITEM', item);
    this.dataSource.data = item;
    return item;
  }


  ViewTopic(id: any) {
    this.topics.GetArticles(id).subscribe(
    response => {
      User.topic = {
        articleText: response.desc,
        articleName: response.title,
        authorId: response.author.id,
        authorUsername: response.author.username,
        authorName: response.author.profile[0].name,
        authorSurname: response.author.profile[0].surname
      };

      console.log('Ответ', User.topic.authorName);
    },
      error => console.log('error', error)
    );
    // ArticleBlockComponent.ViewTopicText();
    console.log('id', id);

  }

  addCompany() {
    this.company.owner = User.userId;
    console.log(this.company.owner);
    this.topics.AddCompany(this.company).subscribe(
      response => {
        console.log('Все огонь', response);
        this.topics.ShowTopic();
        setTimeout(this.parse(User.data), 1500);
        window.location.reload();

      },
      error => console.log(error)
    );
  }


}
