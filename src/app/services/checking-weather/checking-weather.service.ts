import { ISelectOption } from './../../../typings/typings.d';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as appKeyJson from "./app-key.json";
import { Observable } from "rxjs";
import { IWeather } from '../../../typings/typings.js';

@Injectable({
  providedIn: "root"
})
export class CheckingWeatherService {
  constructor(private http: HttpClient) {
    this._key = appKeyJson.key;
  }

  private _key: string;

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;

    // update app key

    /* this.http
      .post("http://localhost:3001/key", {
        params: {
          key: value
        }
      })
      .toPromise()
      .then(ans => {
        console.log("success");
      })
      .catch(err => {
        console.log("false");
      });*/
  }

  getWeatherOption(): ISelectOption[] {
    return [{
      value: '0',
      viewValue: 'Days'
    }] as ISelectOption[]
  }

  getCurrentWeather(cityId: number): Observable<object> {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        id: cityId.toString(),
        appid: this._key
      }
    });
  }

  getForecast5(cityId: number): Observable<object> {
    return this.http.get("http://api.openweathermap.org/data/2.5/forecast", {
      params: {
        id: cityId.toString(),
        appid: this._key
      }
    });
  }

  getCityList(query: string): Observable<object> {
    return this.http.get("https://secret-castle-75808.herokuapp.com/cities", {
      params: {
        query: query,
      }
    });
  }

  async changeKey(newKey: string): Promise<boolean> {
    return await this.http
      .get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          id: "3081368",
          appid: newKey
        }
      })
      .toPromise()
      .then((data: IWeather) =>{
        this.key = newKey;
        return true;
      })
      .catch((data)=> {
        return false;
      })
  }
}
