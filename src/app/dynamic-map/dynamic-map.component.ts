import { Component, Input } from "@angular/core";
import { ICity } from "../../typings/typings";

@Component({
  selector: "app-dynamic-map",
  templateUrl: "./dynamic-map.component.html",
  styleUrls: ["./dynamic-map.component.scss"]
})
export class DynamicMapComponent {
  constructor() {
    this.isSet = false;
  }
  isSet: boolean;

  @Input() data: ICity | boolean;
  options: any;

  showMap(){
    return this.isSet ? true : false;
  }

  setMap() {
    this.options = {
      center: { lat: (<ICity>this.data).coord.lat, lng: (<ICity>this.data).coord.lon },
      zoom: 12
    };

    setTimeout(()=> {
      this.isSet = true;
    },500);
  }
}
