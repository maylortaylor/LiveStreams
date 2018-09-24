import {Component, Inject, OnInit} from '@angular/core';
import {HttpClientService, GetOptions} from '../core';
import {PreloadService} from '../core/preload/preload.service';
import {WeatherForecast} from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {
  public forecasts: WeatherForecast[];
  public baseUrl: string;
  public apiUrl: string;
  constructor(
    public http: HttpClientService,
    @Inject('BASE_URL') baseUrl: string,
    private preloadService: PreloadService<WeatherForecast[]>
  ) {
    this.baseUrl = baseUrl;
  }

  async ngOnInit() {
    this.forecasts = this.preloadService.data;
    if (!this.forecasts) {
      this.getForecasts();
    }
  }

  async getForecasts() {
    let options: GetOptions = {
      url: 'weather/'
    };
    this.http.get<WeatherForecast[]>(options).then(res => {
      this.forecasts = res;
    });
  }
}
