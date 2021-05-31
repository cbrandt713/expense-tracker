import { Component, OnInit } from '@angular/core';
import { AppLink } from './app-link.model';

@Component({
    selector: 'et-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    appLinks: AppLink[] = [
        { path: '/expenses', name: 'Expenses' },
        { path: '/groups', name: 'Groups' },
        { path: '/users', name: 'Users' },
    ];
    constructor() {}

    ngOnInit(): void {}
}
