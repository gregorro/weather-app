import { IList, IWeatherPackage } from './../../typings/typings.d';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.scss']
})
export class HourComponent implements OnInit {
  constructor() {
    this.isBlackText = false;
    this.hourlyWeather = [];
  }

  isBlackText: boolean;
  hourlyWeather: IWeatherPackage[];

  @Input() data: IList[];

  ngOnInit(): void {
    this.setHourlyWeather();
  }

  ngAfterViewChecked(): void {
    let i: number = 0;

    const doc = document.getElementsByTagName("body")[0];
    doc.className === "drizzle-weather" || doc.className === "snow-weather"
      ? (this.isBlackText = true)
      : (this.isBlackText = false);

    if (this.hourlyWeather) {
      for (let day of this.hourlyWeather) {
        const arrow: HTMLElement = document.getElementById(`arrow-${i}`);
        if (arrow) arrow.style.transform = `rotate(${day.wind.deg}deg)`;
        i++;
      }
    }
  }

  setHourlyWeather(): void {
    for (let hour of this.data) {
        this.hourlyWeather.push({
          picture: `http://openweathermap.org/img/wn/${
            hour.weather[0].icon
          }@2x.png`,
          mainDescription: hour.weather[0].main,
          description: hour.weather[0].description,
          wind: hour.wind ? hour.wind : null,
          snow: hour.snow ? hour.snow : null,
          clouds: hour.clouds ? hour.clouds : null,
          rain: hour.rain ? hour.rain : null,
          humidity: hour.main.humidity,
          pressure: hour.main.pressure.toFixed(),
          temp: (hour.main.temp - 273.15).toFixed().toString(),
          time: hour.dt,
          text: hour.dt_txt,
          date: new Date(hour.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            hour: 'numeric'
          })
        });
    }
  }
}
