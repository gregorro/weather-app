import {
  IWeather,
  IWind,
  ISnow,
  IRain,
} from "./../services/checking-weather/typings.d";
import { CheckingWeatherService } from "./../services/checking-weather/checking-weather.service";
import { Component, ViewChild, ElementRef, DoCheck } from "@angular/core";

export interface IWeatherPackage {
  picture: string;
  description: string;
  wind: IWind | null;
  snow: ISnow | null;
  rain: IRain | null;
  humidity: number;
  pressure: number;
  temp: number;
}

@Component({
  selector: "app-current-weather",
  templateUrl: "./current-weather.component.html",
  styleUrls: ["./current-weather.component.scss"]
})
export class CurrentWeatherComponent implements DoCheck {
  constructor(private http: CheckingWeatherService) {}

  isAvailableData: boolean = false;
  currentViewWeather: IWeather = null;
  currentDate: string;
  options: any;

  ngDoCheck() {
    const arrow: HTMLElement = document.getElementById("arrow");
    if (arrow && this.currentViewWeather) {
      arrow.style.transform = `rotate(${this.currentViewWeather.wind.deg}deg)`;

      const body: HTMLCollectionOf<
        HTMLBodyElement
      > = document.getElementsByTagName("body");
      const id: string = this.currentViewWeather.weather[0].id.toString();
      switch (id) {
        case "200":
        case "201":
        case "202":
        case "210":
        case "211":
        case "212":
        case "221":
        case "230":
        case "231":
        case "232":
          body[0].classList.value = "thunderstorm-weather";
          break;
        case "300":
        case "301":
        case "302":
        case "310":
        case "311":
        case "312":
        case "313":
        case "314":
        case "321":
          body[0].classList.value = "drizzle-weather";
          break;
        case "500":
        case "501":
        case "502":
        case "503":
        case "504":
        case "511":
        case "520":
        case "521":
        case "522":
        case "531":
          body[0].classList.value = "rain-weather";
          break;
        case "600":
        case "601":
        case "602":
        case "611":
        case "612":
        case "613":
        case "615":
        case "616":
        case "620":
        case "621":
        case "622":
          body[0].classList.value = "snow-weather";
          break;
        case "701":
        case "711":
        case "721":
        case "731":
        case "741":
        case "751":
        case "761":
        case "771":
        case "781":
          body[0].classList.value = "atmosphere-weather";
          break;
        case "800":
          body[0].classList.value = "clear-weather";
          break;
        case "801":
        case "802":
        case "803":
        case "804":
          body[0].classList.value = "clouds-weather";
          break;
      }
    }
  }

  onNewWeatherIdEvent(id) {
    if (id > 0) {
      this.http
        .getCurrentWeather(id)
        .toPromise()
        .then((data: IWeather) => {
          this.currentViewWeather = data;
          this.currentDate = new Date(
            this.currentViewWeather.dt * 1000
          ).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
          });
          this.options = {
            center: { lat: data.coord.lat , lng: data.coord.lon },
            zoom: 12
          };
          this.isAvailableData = true;
        })
        .catch(err => {
          console.error(err);
        });
    }
    if ((id = -1)) {
      this.isAvailableData = false;
    }
  }
}
