import {Injectable} from '@angular/core';
import {
  HttpClientService,
  GetOptions
} from '../../core/http/httpClient.service';

import {UserRegistration} from '../models/user.registration.interface';
import {ConfigService} from '../../core/utils/config.service';

import {BaseService} from './base.service';

import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class UserService extends BaseService {
  baseUrl: string = '';

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(
    private http: HttpClientService,
    private configService: ConfigService
  ) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    location: string
  ): Promise<UserRegistration> {
    let body = JSON.stringify({email, password, firstName, lastName, location});

    let opts: GetOptions = {
      baseUrl: 'https://localhost:5050/api',
      url: '/accounts',
      params: body
    };

    return this.http.post<UserRegistration>(opts);
  }

  login(userName, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options: GetOptions = {
      baseUrl: 'https://localhost:5050/api',
      url: '/auth/login',
      params: JSON.stringify({userName, password})
    };
    return this.http.post(options).then((res: any) => {
      debugger;
      localStorage.setItem('auth_token', res.auth_token);
      this.loggedIn = true;
      this._authNavStatusSource.next(true);
      location.reload();
      return true;
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    location.reload();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  facebookLogin(accessToken: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({accessToken});

    let options: GetOptions = {
      baseUrl: '',
      url: this.baseUrl + '/externalauth/facebook',
      params: body,
      headers: {'Content-Type': 'application/json'}
    };

    return this.http
      .post<any>(options)
      .then(res => {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        location.reload();
        return true;
      })
      .catch(this.handleError);
  }
}
