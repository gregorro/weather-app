import { ChangeChartComponent } from './../change-chart/change-chart.component';
import { IList, IChartInfoPack } from "./../../typings/typings.d";
import { HourComponent } from "./../hour/hour.component";
import { HourlyWeatherMessageService } from "./../services/hourly-weather-event-service/hourly-weather-event-service";
import { DynamicComponentDirective } from "./../map.directive";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ISelectOption } from "../../typings/typings";
import { IForecast } from "../../typings/typings";
import { CheckingWeatherService } from "../services/checking-weather/checking-weather.service";
import {
  Component,
  ComponentFactory,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef
} from "@angular/core";
import { FiveDaysComponent } from "../five-days/five-days.component";

let optionData: ISelectOption[] = [
  {
    value: "-2",
    viewValue: "Temperature"
  },
  {
    value: "-3",
    viewValue: "Pressure"
  },
  {
    value: "-4",
    viewValue: "Humidity"
  }
];

@Component({
  selector: "app-weather-container",
  templateUrl: "./weather-container.component.html",
  styleUrls: ["./weather-container.component.scss"]
})
export class WeatherContainer {
  constructor(
    private hourlyWeatherMessage: HourlyWeatherMessageService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: CheckingWeatherService,
    private snackBar: MatSnackBar
  ) {
    this.options = Array.from(optionData);
    this.isAvailableData = false;
    this.days = [];
    this.hourlyWeatherMessage.getMessageWithDayToSet().subscribe((date: string) => {
      this.searchedHourlyWeatherDate = date;
      const index: number = this.days.findIndex(
        (day: ISelectOption): boolean => {
          return new Date(day.viewValue).getDay() === new Date(date).getDay();
        }
      );
      this.setWeatherView(index.toString());
    });
  }
  options: ISelectOption[];
  currentViewWeather: IForecast;
  days: ISelectOption[];
  isAvailableData: boolean;
  searchedHourlyWeatherDate: string;
  currentSelectedWeather: string;

  @ViewChild(DynamicComponentDirective) weatherView: DynamicComponentDirective;

  onNewWeatherIdEvent(id: number) {
    if (id === -1) {
      this.isAvailableData = false;
      this.weatherView.viewContainerRef.clear();
    } else if (id > 0) {
      this.http
        .getForecastHourly(id)
        .toPromise()
        .then((data: IForecast) => {
          this.currentViewWeather = data;
          this.isAvailableData = true;
          this.days = [];
          this.options = Array.from(optionData);
          this.setOptions();
          this.setData();
          this.setWeatherView("-1");
        })
        .catch(err => {
          this.snackBar.open("Error", "Unexpected server error.", {
            duration: 3000
          });
        });
    }
  }

  setOptions(): void {
    let weathers = {
      clouds: false,
      rain: false,
      snow: false
    };
    let i = -5;

    for (let day of this.currentViewWeather.list) {
      for (let weather in weathers) {
        if (weathers[weather] === false && day[weather]) {
          this.options.push({
            value: i.toString(),
            viewValue: weather.charAt(0).toUpperCase() + weather.slice(1)
          });
          i--;
          weathers[weather] = true;
        }
      }
    }
  }

  setData(): void {
    let i = 0;
    for (let day of this.currentViewWeather.list) {
      if (new Date(day.dt_txt).getHours() === 12) {
        if (
          new Date(day.dt_txt).getDay() !==
          new Date(this.currentViewWeather.list[0].dt_txt).getDay()
        ) {
          this.setDays(i, this.currentViewWeather.list[0].dt_txt);
          i++;
        }
        break;
      }
    }

    for (let day of this.currentViewWeather.list) {
      if (new Date(day.dt_txt).getHours() === 12) {
        this.setDays(i, day.dt_txt);
        i++;
      }
    }
  }

  setDays(i: number, date: string): void {
    this.days.push({
      value: i.toString(),
      viewValue: new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    });
  }

  setWeatherView(id: string, setDate?: boolean): void {
    const idNumber = parseInt(id, 10);
    setDate && idNumber >= 0
      ? (this.searchedHourlyWeatherDate = this.days[idNumber].viewValue)
      : null;
    this.currentSelectedWeather = id;

    let componentFactory: ComponentFactory<{}>;
    let data: any;
    switch (id) {
      case "-7":
      case "-6":
      case "-5":
      case "-4":
      case "-3":
      case "-2":
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(
          ChangeChartComponent
        );
        data = {
          weather: this.currentViewWeather,
          name: this.options.find((option: ISelectOption)=>{
            return option.value === id;
          }).viewValue,
        } as IChartInfoPack;
        break;
      case "-1":
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(
          FiveDaysComponent
        );
        data = this.currentViewWeather;
        break;
      default:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(
          HourComponent
        );
        data = this.currentViewWeather.list.filter((hourlyWeather: IList) => {
          return new Date(hourlyWeather.dt_txt).getDay() ===
            new Date(this.searchedHourlyWeatherDate).getDay()
            ? hourlyWeather
            : false;
        });
    }

    const viewContainerRef = this.weatherView.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    (componentRef as ComponentRef<any>).instance.data = data;
  }
}
