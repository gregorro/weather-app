import { HTMLEvent } from './../../typings/typings.d';
import { CheckingWeatherService } from "./../services/checking-weather/checking-weather.service";
import { ICity } from "../../typings/typings";
import {
  Component,
  Output,
  EventEmitter,
  AfterViewChecked
} from "@angular/core";
import { SelectItem } from "primeng/api";
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-aside-panel",
  templateUrl: "./aside-panel.component.html",
  styleUrls: ["./aside-panel.component.scss"]
})
export class AsidePanelComponent implements AfterViewChecked {
  constructor(private http: CheckingWeatherService, private snackBar: MatSnackBar) {
    this.isSlideBarOpen = false;
    this.isAnyCity = false;
    this.citesList.push(this.firstCityPlaceholder);
    this.infoError = false;
    this.infoSuccess = false;
    this.startChangeDetection = false;
    this.lastCityId = -1;
  }

  firstCityPlaceholder: SelectItem = {
    value: null,
    label: "Add city first"
  };
  citesList: SelectItem[] = [];
  filteredCities: ICity[];
  city: ICity;
  isSlideBarOpen: boolean;
  isAnyCity: boolean;
  selectedCity: ICity;
  key: string;
  infoSuccess: boolean;
  infoError: boolean;
  startChangeDetection: boolean;
  lastCityId: number;

  @Output() newWeatherIdEvent: EventEmitter<number> = new EventEmitter();
  @Output() showMapEvent: EventEmitter<ICity | boolean> = new EventEmitter();

  async filterCities(event): Promise<void> {
    let query: string = event.query;
    await this.http
      .getCityList(query)
      .toPromise()
      .then((data: ICity[]) => {
        this.filteredCities = data;
      }).catch((err: HttpErrorResponse) =>{
        this.snackBar.open('Error', 'Unexpected server error.',{
          duration: 3000,
        });
      });
  }

  ngAfterViewChecked() {
    if (this.startChangeDetection) {
      const listItem: HTMLCollectionOf<
        Element
      > = document.getElementsByClassName("ui-autocomplete-list-item");
      let focusCityArrayIndex: number;
      if (listItem.length > 0) {
        const listElement: Element[] = Array.from(listItem);
        focusCityArrayIndex = listElement.findIndex((value: Element) => {
          if (value.id == "p-highlighted-option") {
            return true;
          }
          return false;
        });
      }

      if (focusCityArrayIndex >= 0 && this.filteredCities[focusCityArrayIndex].id !== this.lastCityId && window.innerWidth >= 600) {
        this.showMapEvent.emit(this.filteredCities[focusCityArrayIndex]);
        this.lastCityId = this.filteredCities[focusCityArrayIndex].id;
      }
    }
  }


  hideMap(): void{
    if(window.innerWidth >= 600){
      this.startChangeDetection = false;
    this.showMapEvent.emit(false);
    }
  }

  addCitytoList(): void {
    if (!this.isAnyCity) {
      this.isAnyCity = !this.isAnyCity;
      this.citesList.shift();
    }
    this.hideMap();
    let isReplay = false;
    this.citesList.forEach(value => {
      (<ICity>value.value).id == this.city.id ? (isReplay = true) : null;
    });
    isReplay
      ? null
      : this.citesList.push({
          value: this.city,
          label: this.city.name
        });

    this.city = null;
  }

  deleteCity(e: HTMLEvent, city: SelectItem) {
    e.stopPropagation();
    (<ICity>city.value).id == this.selectedCity.id
      ? this.newWeatherIdEvent.emit(-1)
      : null;

    this.citesList = this.citesList.filter(element => {
      return (<ICity>element.value).id !== (<ICity>city.value).id;
    });

    if (this.citesList.length == 0) {
      this.citesList.push(this.firstCityPlaceholder);
      this.isAnyCity = false;
    }
  }

  showWeather(event: HTMLEvent): void {
    const city: ICity = event.value;
    this.newWeatherIdEvent.emit(city.id);
  }

  async changeKey(): Promise<void> {
    await this.http.changeKey(this.key).then((ans: boolean) => {
      if (ans) {
        this.infoSuccess = true;
        setTimeout(() => {
          this.infoSuccess = false;
        }, 5000);
      } else {
        this.infoError = true;
        setTimeout(() => {
          this.infoError = false;
        }, 5000);
      }
    }).catch(err => {
      this.snackBar.open('Error', 'Unexpected server error.',{
        duration: 3000,
      })
    });
  }
}
