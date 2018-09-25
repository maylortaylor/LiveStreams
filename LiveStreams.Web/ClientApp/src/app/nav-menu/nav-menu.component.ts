import {Component} from '@angular/core';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLoggedIn = false;
  constructor(private userService: UserService) {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.userService.logout();
  }
}
