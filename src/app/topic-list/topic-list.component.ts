import {Component, NgModule, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatIconRegistry} from '@angular/material';
import {ArticleBlockComponent} from '../article-block/article-block.component';

interface FoodNode {
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
    this.dataSource.data = this.parse(User.data);
  }
  i = 0 ;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource();
  item: any = [];

  ngOnInit() {
    console.log(JSON.stringify(User.data));
  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  parse(json: any) {

    for (let comp of json[0].company) {
      const compElement: any = {
        name: comp.title,
        children: []
      };
      this.item.push(compElement)
      for (let thread of comp.threads) {
        const threadElement: any = {
          name: thread.title,
          children: []
        };
        this.item[this.item.indexOf(compElement)].children.push(threadElement)
        for (let art of thread.articles) {
          this.item[
            this.item.indexOf(compElement)
            ]
            .children[
              this.item[
                this.item.indexOf(compElement)
                ]
              .children.indexOf(threadElement)
            ].children.push({
            name: art.title,
            id: art.id})
        }
      }
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
    console.log('ITEM',this.item);
    return this.item;
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
      }
      User.NewTopic = true;
      console.log("Ответ", User.topic.authorName)
    },
      error => console.log('error', error)
    );
    //ArticleBlockComponent.ViewTopicText();
    console.log("id", id)
  }
}
