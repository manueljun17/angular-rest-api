import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../shared/article';
import { PaginatedArticle } from '../shared/paginated-article';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Define API
  public apiURL: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  /*========================================
  CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('apiToken'),
    })
  };

  
  // HttpClient API get() method => Fetch articles list
  getArticles(): Promise<any>{
      return this.http.get(this.apiURL+ '/articles', this.getHttpOptions())
      .toPromise()
      .then(response => response as PaginatedArticle)
      .catch(this.handleError);
  }
  getArticlesAtUrl(url: string): Promise<any>{
      return this.http.get(url, this.httpOptions)
      .toPromise()
      .then(response => response as PaginatedArticle)
      .catch(this.handleError);
  }

  // HttpClient API get() method => Fetch article
  getArticle(id): Observable<Article> {
    return this.http.get<Article>(this.apiURL + '/articles/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create article
  createArticle(article): Observable<Article> {
    return this.http.post<Article>(this.apiURL + '/articles', JSON.stringify(article), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update article
  updateArticle(id, article): Observable<Article> {
    return this.http.put<Article>(this.apiURL + '/articles/' + id, JSON.stringify(article), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete article
  deleteArticle(id){
    return this.http.delete<Article>(this.apiURL + '/articles/' + id, this.getHttpOptions())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
    //  window.alert(errorMessage);
     return throwError(errorMessage);
  }
  getHttpOptions() {  
    let apiToken = localStorage.getItem('apiToken');
    if(apiToken){
      return this.httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('apiToken'),
        })
      }
    }
    return this.httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    }
  }  
}
