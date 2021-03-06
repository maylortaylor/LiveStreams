import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserRegistration} from '../../shared/models/user.registration.interface';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}
  registerUser({value, valid}: {value: UserRegistration; valid: boolean}) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    if (valid) {
      this.userService
        .register(
          value.email,
          value.password,
          value.firstName,
          value.lastName,
          value.location
        )
        .then(res => {
          if (res) {
            this.router.navigate(['/account/login'], {
              queryParams: {brandNew: true, email: value.email}
            });
          }
        })
        .catch(res => (this.errors = res))
        .finally(() => (this.isRequesting = false));
    }
  }
}
