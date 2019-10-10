import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {

  @Input() articleDetails = { title: '', body: ''}

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() {
  }

  addArticle( dataArticle ) {
    this.restApi.createArticle( this.articleDetails ).subscribe((data: {}) => {
      this.router.navigate(['/article-list'])
    })
  }
}
