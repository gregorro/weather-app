import {
  IForecast,
  IWind,
  ISnow,
  IRain
} from "./../services/checking-weather/typings.d";
import { CheckingWeatherService } from "./../services/checking-weather/checking-weather.service";
import {
  Component,
  ViewContainerRef,
  ViewChild,
  AfterViewChecked
} from "@angular/core";

export interface IForecastPackage {
  picture: string;
  mainDescription: string;
  description: string;
  wind: IWind | null;
  snow: ISnow | null;
  rain: IRain | null;
  humidity: number;
  pressure: number;
  temp: string;
  time: number;
  text: string;
  date: string;
}

@Component({
  selector: "app-five-day-weather",
  templateUrl: "./five-day-weather.component.html",
  styleUrls: ["./five-day-weather.component.scss"]
})
export class FiveDayWeatherComponent implements AfterViewChecked {
  constructor(private http: CheckingWeatherService) {
    this.isAvailableData = false;
    this.currentViewWeather;
    this.isHourWeather = false;
  }
  isAvailableData: boolean;
  currentViewWeather: IForecast;
  isHourWeather: boolean;
  currentHourWeather: IForecastPackage[];
  daysWeather: IForecastPackage[] = [];
  lastHourIndex: number;

  @ViewChild("dynamicComponentContainer", { read: ViewContainerRef })
  dynamicComponentContainer;

  ngAfterViewChecked() {
    let i = 0;
    let j = 0;

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

  onNewWeatherIdEvent(id) {
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
          console.error(err);
        });
    }

    if ((id = -1)) {
      this.isAvailableData = false;
    }
  }

  setDaysWeather() {
    for (let day of  this.currentViewWeather.list) {
      if (
        new Date(day.dt_txt).getHours() === 12
      ) {
        this.daysWeather.push({
          picture: `http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png`,
          mainDescription: day.weather[0].main,
          description: day.weather[0]
            .description,
          wind: day.wind
            ? day.wind
            : null,
          snow: day.snow
            ? day.snow
            : null,
          rain: day.rain
            ? day.rain
            : null,
          humidity: day.main.humidity,
          pressure: day.main.pressure,
          temp: (day.main.temp - 273.15)
            .toFixed()
            .toString(),
          time: day.dt,
          text: day.dt_txt,
          date: new Date(
            day.dt * 1000
          ).toLocaleDateString("en-US", {
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
      const day: number = new Date(this.daysWeather[index].text).getDay();
      for (let hour of this.currentViewWeather.list) {
        if(new Date(hour.dt_txt).getDay() === day){
          this.currentHourWeather.push({
            picture: `http://openweathermap.org/img/wn/${
              hour.weather[0].icon
            }@2x.png`,
            mainDescription: hour
              .weather[0].main,
            description: hour.weather[0]
              .description,
            wind: hour.wind
              ? hour.wind
              : null,
            snow: hour.snow
              ? hour.snow
              : null,
            rain: hour.rain
              ? hour.rain
              : null,
            humidity: hour.main.humidity,
            pressure: hour.main.pressure,
            temp: (hour.main.temp - 273.15)
              .toFixed()
              .toString(),
            time: hour.dt,
            text: hour.dt_txt,
            date: new Date(
              hour.dt * 1000
            ).toLocaleDateString("en-US", {
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
