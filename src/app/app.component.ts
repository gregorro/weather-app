import { MapDirective } from "./map.directive";
import { DynamicMapComponent } from "./dynamic-map/dynamic-map.component";
import {
  ViewChild,
  ElementRef,
  ComponentFactoryResolver
} from "@angular/core";
import { Component } from "@angular/core";
import { ICoord, ICity } from "./services/checking-weather/typings";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.isSlideBarOpen = false;
    this.data = {
      id: null,
      name: '',
      coord: {
        lat: null,
        lon: null
      },
      country: '',
    }

  }

  isSlideBarOpen: boolean;
  data: ICity;

  @ViewChild("currentSection", { read: ElementRef }) currentSection: ElementRef;
  @ViewChild("fiveDaySection", { read: ElementRef }) fiveDaySection: ElementRef;
  @ViewChild(MapDirective) gMap: MapDirective;

  toggleSection() {
    if (!this.isSlideBarOpen) {
      (<HTMLElement>this.currentSection.nativeElement).style.paddingLeft =
        "400px";
      (<HTMLElement>this.fiveDaySection.nativeElement).style.paddingLeft =
        "400px";
    } else {
      (<HTMLElement>this.currentSection.nativeElement).style.paddingLeft =
        "50px";
      (<HTMLElement>this.fiveDaySection.nativeElement).style.paddingLeft =
        "50px";
    }
    this.isSlideBarOpen = !this.isSlideBarOpen;
  }

  setMap(event: ICity | boolean) {
    if(event){
      this.data = (<ICity>event);
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        DynamicMapComponent
      );

      const viewContainerRef = this.gMap.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);

      componentRef.instance.data = event;
      componentRef.instance.setMap();
    } else{
      this.gMap.viewContainerRef.clear();
    }
  }
}
