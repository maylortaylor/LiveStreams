import {Injectable} from '@angular/core';
import axios from 'axios';
import {Observable} from 'rxjs';
import {AxiosInstance} from 'axios';
import {ErrorHandler} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../core/utils/config.service';

import {LoggerService} from '../logger/logger.service';

export interface Params {
  [key: string]: any;
}

export interface GetOptions {
  baseUrl?: string;
  url: string;
  params?: any;
  headers?: any;
  timeout?: number;
}

export interface ErrorResponse {
  id: string;
  code: string;
  message: string;
}

@Injectable()
export class HttpClientService {
  private _axiosClient: AxiosInstance;
  private _errorHandler: ErrorHandler;
  private _logger: LoggerService;
  private _apiUrl: string;
  private _authUrl: string;
  private _defaultHeaders: any = {'Content-Type': 'application/json'};

  constructor(
    errorHandler: ErrorHandler,
    logger: LoggerService,
    config: ConfigService
  ) {
    this._errorHandler = errorHandler;
    this._logger = logger;
    this._apiUrl = config.getApiURI();
    this._authUrl = config.getAuthURI();

    // The ApiClient wraps calls to the underlying Axios client.
    let axiosService = axios.create({
      timeout: 3000,
      headers: {
        'X-Initialized-At': Date.now().toString()
      }
    });

    axiosService.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );

    this._axiosClient = axiosService;
  }
  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, '/');
        break;
      case 404:
        this.redirectTo(document, '/404');
        break;
      default:
        this.redirectTo(document, '/500');
        break;
    }
    return Promise.reject(error);
  };
  redirectTo = (document, path) => {
    document.location = path;
  };
  public async get<T>(options: GetOptions): Promise<T> {
    try {
      var axiosResponse = await this._axiosClient.request<T>({
        method: 'GET',
        url: !!options.baseUrl
          ? options.baseUrl + options.url
          : this._apiUrl + options.url,
        params: options.params,
        headers: !!options.headers ? options.headers : this._defaultHeaders,
        timeout: !!options.timeout ? options.timeout : 10000
      });

      this._logger.info(`GET --> ${options.url}`, axiosResponse);

      return axiosResponse.data;
    } catch (error) {
      return Promise.reject(this.normalizeError(error));
    }
  }

  public async post<T>(options: GetOptions): Promise<T> {
    try {
      var axiosResponse = await this._axiosClient.request<T>({
        method: 'POST',
        url: !!options.baseUrl
          ? options.baseUrl + options.url
          : this._apiUrl + options.url,
        data: options.params,
        headers: !!options.headers ? options.headers : this._defaultHeaders,
        timeout: !!options.timeout ? options.timeout : 10000
      });

      this._logger.info(`POST --> ${options.url}`, axiosResponse);

      return axiosResponse.data;
    } catch (error) {
      return Promise.reject(this.normalizeError(error));
    }
  }

  // Errors can occur for a variety of reasons. Normalize the error response so that
  // the calling context can assume a standard error structure.
  private normalizeError(error: any): ErrorResponse {
    this._errorHandler.handleError(error);

    // NOTE: Since I'm not really dealing with a production API, this doesn't really
    // normalize anything yet
    return {
      id: '-1',
      code: 'UnknownError',
      message: 'An unexpected error occurred.'
    };
  }
}
