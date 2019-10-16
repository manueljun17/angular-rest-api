import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_model/user';
import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../shared/authenticate.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
    }
}
