import { Component, OnInit } from '@angular/core';
import { WeatherSearcherServiceService } from '../services/weather-searcher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-searcher',
  templateUrl: './weather-searcher.component.html',
  styleUrls: ['./weather-searcher.component.css']
})
export class WeatherSearcherComponent implements OnInit{
  constructor(
    private service: WeatherSearcherServiceService,
    private fb: FormBuilder
  )
  {

  }

  form: FormGroup = this.fb.group({
    city: ['', []],
    cityData: ['', []]
  });

  cities: any;
  weather: any;
  ngOnInit()
  {
    this.form.valueChanges.subscribe(() => {
      this.onChangeCity()
    })
  }

  onChangeCity()
  {
    this.weather = []
    this.service.getCoordinatesByCity(this.form.value.city).subscribe(data => {
      this.cities = data;
    })
  }

  onSelectedCity(city: any)
  {
    this.form.get('cityData')?.setValue(city);
  }

  search()
  {
    
    this.service.getWeather(this.form.value.cityData.lat,this.form.value.cityData.long).subscribe(data => {
      console.log("data", data.list.slice(0, 5))
      this.weather = data.list.slice(0, 5)
    })
  }
}
