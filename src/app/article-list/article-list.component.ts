import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { PaginatedArticle } from '../shared/paginated-article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  Articles:PaginatedArticle;

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadArticles()
  }

  // Get articles list
  loadArticles() {
    return this.restApi.getArticles().then(
      articles=>this.Articles = articles);
  }

  // Delete articles
  deleteArticle(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteArticle(id).subscribe(data => {
        this.loadArticles()
      })
    }
  }

  firstPage() {
    this.restApi.getArticlesAtUrl(this.Articles.first_page_url).then(articles=>this.Articles = articles);
  }

  prevPage() {
    this.restApi.getArticlesAtUrl(this.Articles.prev_page_url).then(articles=>this.Articles = articles);
  }

  nextPage() {
    this.restApi.getArticlesAtUrl(this.Articles.next_page_url).then(articles=>this.Articles = articles);
  }

  lastPage() {
    this.restApi.getArticlesAtUrl(this.Articles.last_page_url).then(articles=>this.Articles = articles);
  }
}
