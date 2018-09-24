import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  _apiURI: string;
  _authURI: string;

  constructor() {
    this._apiURI = 'http://localhost:5069/api/';
    this._authURI = 'http://localhost:5050/api/';
  }

  getApiURI() {
    return this._apiURI;
  }
  getAuthURI() {
    return this._authURI;
  }
}
