import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  articleData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
  }

  ngOnInit() {
    this.restApi.getArticle(this.id).subscribe((data: {}) => {
      this.articleData = data;
    })
  }

  // Update article data
  updateArticle() {
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateArticle(this.id, this.articleData).subscribe(data => {
        this.router.navigate(['/article-list'])
      })
    }
  }

}
