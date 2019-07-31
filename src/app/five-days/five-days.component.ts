import { HourlyWeatherMessageService } from './../services/hourly-weather-event-service/hourly-weather-event-service';
import { IWeatherPackage, IForecast } from "./../../typings/typings.d";
import { Component, OnInit, Input, AfterViewChecked, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-five-days",
  templateUrl: "./five-days.component.html",
  styleUrls: ["./five-days.component.scss"]
})
export class FiveDaysComponent implements OnInit, AfterViewChecked {
  constructor(private hourlyWeatherMessage: HourlyWeatherMessageService) {
    this.isBlackText = false;
    this.daysWeather = [];
  }

  isBlackText: boolean;
  daysWeather: IWeatherPackage[];

  @Input() data: IForecast;

  ngOnInit(): void {
    this.setDaysWeather();
  }

  ngAfterViewChecked(): void {
    let i: number = 0;

    const doc = document.getElementsByTagName("body")[0];
    doc.className === "drizzle-weather" || doc.className === "snow-weather"
      ? (this.isBlackText = true)
      : (this.isBlackText = false);

    if (this.daysWeather) {
      for (let day of this.daysWeather) {
        const arrow: HTMLElement = document.getElementById(`arrow-${i}`);
        if (arrow) arrow.style.transform = `rotate(${day.wind.deg}deg)`;
        i++;
      }
    }
  }

  setDaysWeather(): void {
    for (let day of this.data.list) {
      if (new Date(day.dt_txt).getHours() === 12) {
        this.daysWeather.push({
          picture: `http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png`,
          mainDescription: day.weather[0].main,
          description: day.weather[0].description,
          wind: day.wind ? day.wind : null,
          snow: day.snow ? day.snow : null,
          rain: day.rain ? day.rain : null,
          humidity: day.main.humidity,
          clouds: day.clouds ? day.clouds : null,
          pressure: day.main.pressure.toFixed(),
          temp: (day.main.temp - 273.15).toFixed().toString(),
          time: day.dt,
          text: day.dt_txt,
          date: new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
          })
        });
      }
    }
  }

  showHourlyWeather(day: IWeatherPackage): void{
    this.hourlyWeatherMessage.sendMessageWithDayToSet(day.text);
  }
}
