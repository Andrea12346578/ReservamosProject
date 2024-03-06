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
  weather: any[] = [];
  ngOnInit()
  {
    var someDate = new Date();
    var numberOfDaysToAdd = 6;
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
  }

  search()
  {
    
    this.service.getWeather(this.form.value.cityData.lat,this.form.value.cityData.long).subscribe(data => {
      //this.weather = data.list.filter((item:any) => new Date(item.dt_txt) < this.maxDate);
      let items = []
      console.log(this.dates)
      console.log(data.list)
      this.dates.forEach(date1 => {
        //console.log("p", date1.getTime())
        //console.log("p", date1)
        let datePart = [
          date1.getFullYear(),
          date1.getMonth() + 1,
          date1.getDate()
        ].map((n, i) => n.toString().padStart(i === 2 ? 2 : 2, "0")).join("-");

        console.log(datePart)
        let arrayh = data.list.filter((item:any) => 
        (item.dt_txt.split(' ')[0] == datePart))
        if(arrayh.length > 0)
        this.weather.push(
          { date: date1,
            values: arrayh
          });

      })

      console.log(this.weather)
    })
  }

  validarFecha(date: any)
  {
    return this.weather.filter((item:any) => new Date(item.dt_txt).getTime() == date.getTime());
  }
}
