import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherSearcherServiceService {

  constructor(private http: HttpClient) { }

  getCoordinatesByCity(city: any): Observable<any> {    
    return this.http.get('https://search.reservamos.mx/api/v2/places?q='+city);
  }

  getWeather(lat: any, lon: any): Observable<any> {    
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=f4153696c92472f57a9f54fe83f398d7');
  }
  

}
