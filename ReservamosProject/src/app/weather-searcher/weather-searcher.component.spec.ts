import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSearcherComponent } from './weather-searcher.component';

describe('WeatherSearcherComponent', () => {
  let component: WeatherSearcherComponent;
  let fixture: ComponentFixture<WeatherSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherSearcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
