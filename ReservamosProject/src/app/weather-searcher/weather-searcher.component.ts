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

  dates: any[] = [];
  maxDate: any;
  cities: any;
  weather: any = [];
  ngOnInit()
  {
    var someDate = new Date();
    var numberOfDaysToAdd = 5;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    for(let i = 0; i < numberOfDaysToAdd; i++)
    {
      var someDate = new Date();
      var result = someDate.setDate(someDate.getDate() + i);
      this.dates.push(new Date(result))
    }
    this.maxDate = new Date(result);
    console.log(new Date(result))
    this.form.valueChanges.subscribe(() => {
      this.onChangeCity()
    })
  }

  onChangeCity()
  {
    this.service.getCoordinatesByCity(this.form.value.city).subscribe(data => {
      this.cities = data;
    })
  }

  onSelectedCity(city: any)
  {
    this.form.get('cityData')?.setValue(city);
    this.weather = [];
  }

  search()
  {
    
    this.service.getWeather(this.form.value.cityData.lat,this.form.value.cityData.long).subscribe(data => {
      this.weather = data.list.filter((item:any) => new Date(item.dt_txt) < this.maxDate);
    })
  }

  validarFecha(date: any)
  {
    return this.weather.filter((item:any) => new Date(item.dt_txt).getTime() == date.getTime());
  }
}
