import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  _apiURI: string;
  _authURI: string;

  constructor() {
    // this._apiURI = 'https://localhost:5069/api/';
    this._apiURI = '/api/';
    this._authURI = 'https://localhost:5050/api/';
    // this._authURI = '/id_auth/';
  }

  getApiURI() {
    return this._apiURI;
  }
  getAuthURI() {
    return this._authURI;
  }
}
