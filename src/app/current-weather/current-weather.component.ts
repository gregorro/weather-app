import { IWeatherPackage } from './../../typings/typings.d';
import { IWeather } from "../../typings/typings";
import { CheckingWeatherService } from "./../services/checking-weather/checking-weather.service";
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked
} from "@angular/core";

@Component({
  selector: "app-current-weather",
  templateUrl: "./current-weather.component.html",
  styleUrls: ["./current-weather.component.scss"]
})
export class CurrentWeatherComponent implements AfterViewChecked {
  constructor(private http: CheckingWeatherService) {
    this.isAvailableData = false;
    this.isMapActive = false;
    this.isStart = true;
    this.isBlackText = false;
  }

  isAvailableData: boolean;
  isMapActive: boolean;
  currentDate: string;
  options: any;
  dayWeather: IWeatherPackage;
  isStart: boolean;
  isBlackText: boolean;


  @ViewChild("arrow", { read: ElementRef }) arrow: ElementRef;

  ngAfterViewChecked() {
    const doc = document.getElementsByTagName('body')[0];
    doc.className === 'drizzle-weather' || doc.className === 'snow-weather'  ? this.isBlackText = true: this.isBlackText = false;

    if (this.arrow && this.dayWeather) {
      this.arrow.nativeElement.style.transform = `rotate(${
        this.dayWeather.wind.deg
      }deg)`;

      const body: HTMLCollectionOf<
        HTMLBodyElement
      > = document.getElementsByTagName("body");
      const id: string = this.dayWeather.weatherId.toString();
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
          body[0].classList.value = "clouds-weather";
          break;
        case "803":
        case "804":
          body[0].classList.value = "clouds2-weather";
          break;
      }
    }
  }

  setDaysWeather(currentViewWeather: IWeather) {
    this.isStart = false;
    this.dayWeather = {
      picture: `http://openweathermap.org/img/wn/${
        currentViewWeather.weather[0].icon
      }@2x.png`,
      mainDescription: currentViewWeather.weather[0].main,
      description: currentViewWeather.weather[0].description,
      wind: currentViewWeather.wind ? currentViewWeather.wind : null,
      snow: currentViewWeather.snow ? currentViewWeather.snow : null,
      rain: currentViewWeather.rain ? currentViewWeather.rain : null,
      humidity: currentViewWeather.main.humidity,
      pressure: currentViewWeather.main.pressure.toFixed(),
      temp: (currentViewWeather.main.temp - 273.15).toFixed(),
      time: currentViewWeather.dt,
      weatherId: currentViewWeather.weather[0].id,
      name: currentViewWeather.name,
      country: currentViewWeather.sys.country,
      date: new Date(currentViewWeather.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    };
  }

  onNewWeatherIdEvent(id) {
    this.isMapActive = false;
    if (id > 0) {
      this.http
        .getCurrentWeather(id)
        .toPromise()
        .then((data: IWeather) => {
          this.setDaysWeather(data);
          this.options = {
            center: { lat: data.coord.lat, lng: data.coord.lon },
            zoom: 12
          };
          this.isMapActive = true;
          this.isAvailableData = true;
        })
        .catch(err => {
          console.error(err);
        });
    }
    if ((id === -1)) {
      this.isAvailableData = false;
    }
  }
}
