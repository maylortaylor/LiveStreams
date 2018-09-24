import {Injectable} from '@angular/core';
import {
  HttpClientService,
  GetOptions
} from '../../core/http/httpClient.service';

import {HomeDetails} from '../models/home.details.interface';
import {ConfigService} from '../../core/utils/config.service';
import {BaseService} from '../../shared/services/base.service';

@Injectable()
export class DashboardService extends BaseService {
  _authUrl: string = '';

  constructor(
    private http: HttpClientService,
    private configService: ConfigService
  ) {
    super();
    this._authUrl = this.configService.getAuthURI();
  }

  getHomeDetails(): Promise<HomeDetails> {
    let authToken = localStorage.getItem('auth_token');

    let options: GetOptions = {
      baseUrl: this._authUrl,
      url: 'dashboard/home',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    };

    return this.http.get<any>(options);
  }
}
