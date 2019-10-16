import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // Define API
    public apiURL: string = 'http://localhost:8000/api';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('apiToken'),
        })
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        // need to change check the route later in laravel
        return this.http.post<any>(this.apiURL + '/login', { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('apiToken', 'Bearer ' + user.data.api_token);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
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
