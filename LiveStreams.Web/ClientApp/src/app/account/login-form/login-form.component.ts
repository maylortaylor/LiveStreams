import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Credentials} from '../../shared/models/credentials.interface';
import {UserService} from '../../shared/services/user.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = {email: '', password: ''};
  showPassword: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.email = param['email'];
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login({value, valid}: {value: Credentials; valid: boolean}) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    if (valid) {
      this.userService
        .login(value.email, value.password)
        .then(result => {
          if (result) {
            this.router.navigate(['/dashboard/home']);
          }
        })
        .catch(res => (this.errors = res))
        .finally(() => (this.isRequesting = false));
    }
  }
}
