import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '@/_models';
import { UserService, AuthenticationService, AlertService } from '@/_services';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    currentUser: User;
    loading = false;
    auditUsers = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.loadAllUsersList();
    }

    ngOnInit() {
        // this.loadAllUsersList();
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.loadAllUsers());
    // }

    loadAllUsersList() {
        console.log("this.currentUser", this.currentUser['_id'])
        this.userService.getAudit(this.currentUser['_id'])
            .subscribe(
                data => {
                    var res = Object.entries(data);
                    console.log(res);
                    this.auditUsers = res;
                },
                error => {
                    alert("You don't have permission for audit page");
                    this.router.navigate(['']);

                    // this.loading = false;
                    // this.router.navigate(['/']);
                });
    }

}