import { MatSnackBar } from '@angular/material/snack-bar';
import { ISelectOption } from './../../typings/typings.d';
import {
  IForecast, IWeatherPackage,
} from "../../typings/typings";
import { CheckingWeatherService } from "./../services/checking-weather/checking-weather.service";
import {
  Component,
  ViewContainerRef,
  ViewChild,
  AfterViewChecked
} from "@angular/core";

@Component({
  selector: "app-five-day-weather",
  templateUrl: "./five-day-weather.component.html",
  styleUrls: ["./five-day-weather.component.scss"]
})
export class FiveDayWeatherComponent implements AfterViewChecked {
  constructor(private http: CheckingWeatherService, private snackBar: MatSnackBar) {
    this.isAvailableData = false;
    this.isHourWeather = false;
    this.daysWeather = [];
    this.options = this.http.getWeatherOption();
    this.isBlackText = false;
  }
  isAvailableData: boolean;
  isBlackText: boolean;
  currentViewWeather: IForecast;
  isHourWeather: boolean;
  currentHourWeather: IWeatherPackage[];
  daysWeather: IWeatherPackage[];
  lastHourIndex: number;
  currentSelectedDay: string;
  options: ISelectOption[];

  @ViewChild("dynamicComponentContainer", { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;

  ngAfterViewChecked() {
    let i = 0;
    let j = 0;

    const doc = document.getElementsByTagName('body')[0];
    doc.className === 'drizzle-weather' || doc.className === 'snow-weather'  ? this.isBlackText = true: this.isBlackText = false;

    if (this.daysWeather) {
      for (let day of this.daysWeather) {
        const arrow: HTMLElement = document.getElementById(`arrow-${i}`);
        if (arrow && this.currentViewWeather)
          arrow.style.transform = `rotate(${day.wind.deg}deg)`;
        i++;
      }
    }

    if (this.currentHourWeather) {
      for (let currentHour of this.currentHourWeather) {
        const arrow: HTMLElement = document.getElementById(`arrow-${i + j}`);
        if (arrow && this.currentViewWeather)
          arrow.style.transform = `rotate(${currentHour.wind.deg}deg)`;
        j++;
      }
    }
  }

  onNewWeatherIdEvent(id: number) {
    if (id > 0) {
      this.http
        .getForecast5(id)
        .toPromise()
        .then((data: IForecast) => {
          this.daysWeather = [];
          this.isHourWeather = false;
          this.lastHourIndex = null;
          this.currentViewWeather = data;
          this.setDaysWeather();
          this.isAvailableData ? null : (this.isAvailableData = true);
        })
        .catch(err => {
          this.snackBar.open('Error', 'Unexpected server error.',{
            duration: 3000,
          })
        });
    }

    if ((id === -1)) {
      this.isAvailableData = false;
      this.isHourWeather = false;
    }
  }

  setDaysWeather() {
    for (let day of this.currentViewWeather.list) {
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

  setHourWeather(index: number) {
    if (index !== this.lastHourIndex) {
      this.currentHourWeather = [];
      this.currentSelectedDay = this.daysWeather[index].date;
      const day: number = new Date(this.daysWeather[index].text).getDay();
      for (let hour of this.currentViewWeather.list) {
        if (new Date(hour.dt_txt).getDay() === day) {
          this.currentHourWeather.push({
            picture: `http://openweathermap.org/img/wn/${
              hour.weather[0].icon
            }@2x.png`,
            mainDescription: hour.weather[0].main,
            description: hour.weather[0].description,
            wind: hour.wind ? hour.wind : null,
            snow: hour.snow ? hour.snow : null,
            rain: hour.rain ? hour.rain : null,
            humidity: hour.main.humidity,
            pressure: hour.main.pressure.toFixed(),
            temp: (hour.main.temp - 273.15).toFixed().toString(),
            time: hour.dt,
            text: hour.dt_txt,
            date: new Date(hour.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric"
            })
          });
        }
      }
      this.lastHourIndex = index;
      this.isHourWeather = true;
    } else {
      this.isHourWeather = !this.isHourWeather;
    }
  }
}
