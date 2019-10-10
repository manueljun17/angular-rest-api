import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_model/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('apiToken'),
        })
    }
    // Define API
    public apiURL: string = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.apiURL + '/users', this.getHttpOptions());
    }

    register(user: User) {
        return this.http.post(this.apiURL + '/register', user);
    }

    delete(id: number) {
        return this.http.delete(this.apiURL + '/${id}');
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