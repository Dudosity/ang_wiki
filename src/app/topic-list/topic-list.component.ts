import {Component, NgModule, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatIconRegistry} from '@angular/material';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];
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
  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  i = 0 ;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource();
  item: any = [];
  topic: any;

  ngOnInit() {
    this.topic = User.data;
    this.parse(User.data);
    console.log(JSON.stringify(User.data));
  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  parse(json: any) {

    for (let comp of json[0].company) {
      this.item.push({
        name: comp.title,
        children: [{}]
      })
      for (let thread of comp.threads) {
        this.item[comp].children.push(
          {
            name: thread,
            children: [{}]
          }
        )

        for (let art of thread.articles) {
          this.item[comp].children[thread].children.push({
              name: art
            }
          )
        }
      }
    }
  console.log("Смотри сюда ",this.item)
  }


}
