import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBlockComponent } from './article-block.component';

describe('ArticleBlockComponent', () => {
  let component: ArticleBlockComponent;
  let fixture: ComponentFixture<ArticleBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
