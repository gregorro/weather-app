import { MatSnackBar } from '@angular/material/snack-bar';
import { ISelectOption } from './../../../typings/typings.d';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IWeather } from '../../../typings/typings.js';

@Injectable({
  providedIn: "root"
})
export class CheckingWeatherService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getKey();
  }

  private _key: string;

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;

     /*this.http
      .post("https://secret-castle-75808.herokuapp.com/key", {
        params: {
          key: value
        }
      })
      .toPromise()
      .then(ans => {
        this.snackBar.open("Success", "The key has been saved.", {
          duration: 3000
        });
      })
      .catch(err => {
        console.log(err);
        this.snackBar.open("Error", "The key can not be saved.", {
          duration: 3000
        });
      });*/
  }

  getKey(): void{
     this.http.get("https://secret-castle-75808.herokuapp.com/key").subscribe((ans: any)=> {
        this._key = ans.key;
    }, err =>{
      console.log(err);
      this.snackBar.open("Error", "The key can not be retrieved.", {
        duration: 3000
      });
    });
  }

  getCurrentWeather(cityId: number): Observable<object> {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        id: cityId.toString(),
        appid: this._key
      }
    });
  }


  getForecastHourly(cityId: number): Observable<object> {
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
      .catch((err)=> {
        return false;
      })
  }
}
