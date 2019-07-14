import { MapDirective } from "./map.directive";
import { DynamicMapComponent } from "./dynamic-map/dynamic-map.component";
import {
  ViewChild,
  ElementRef,
  ComponentFactoryResolver,
  OnInit,
  AfterContentChecked
} from "@angular/core";
import { Component } from "@angular/core";
import { ICity } from "../typings/typings";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterContentChecked {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.isSlideBarOpen = false;
    this.data = {
      id: null,
      name: "",
      coord: {
        lat: null,
        lon: null
      },
      country: ""
    };
  }
  asideBar: HTMLElement;
  isSlideBarOpen: boolean;
  data: ICity;

  @ViewChild("section", { read: ElementRef }) section: ElementRef;
  @ViewChild(MapDirective) gMap: MapDirective;

  ngOnInit() {
    this.asideBar = document.getElementById("aside-bar");
  }

  ngAfterContentChecked(){
    const choiceBox: HTMLElement= document.querySelector(".ui-autocomplete-panel");
    const overlayPanel: HTMLElement = document.querySelector(".ui-overlaypanel");
    if (choiceBox && overlayPanel){
      const positionOfChoiceBox: ClientRect = choiceBox.getBoundingClientRect();
      overlayPanel.style.left = `${positionOfChoiceBox.left}px`;
      overlayPanel.style.top = `${positionOfChoiceBox.bottom + window.scrollY}px`;
    }
    if(window.innerWidth >= 1500 && this.isSlideBarOpen)
    (<HTMLElement>this.section.nativeElement).style.paddingLeft = "400px"
    if(window.innerWidth < 1500 && this.isSlideBarOpen)
    (<HTMLElement>this.section.nativeElement).style.paddingLeft = "0"
  }

  toggleSection() {
      if (!this.isSlideBarOpen) {
        window.innerWidth > 1500 ? (<HTMLElement>this.section.nativeElement).style.paddingLeft = "400px": null;
        this.asideBar.style.transform = "translateX(0)";
        this.asideBar.style.opacity = "1";
        this.asideBar.style.visibility = "visible";
      } else {
       (<HTMLElement>this.section.nativeElement).style.paddingLeft = "0";
        this.asideBar.style.transform = "translateX(-400px)";
        this.asideBar.style.opacity = "0";
        this.asideBar.style.visibility = "hidden";
      }
      this.isSlideBarOpen = !this.isSlideBarOpen;
  }

  setMap(event: ICity | boolean) {
    if (event) {
      this.data = <ICity>event;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        DynamicMapComponent
      );

      const viewContainerRef = this.gMap.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);

      componentRef.instance.data = event;
      componentRef.instance.setMap();
    } else {
      this.gMap.viewContainerRef.clear();
    }
  }
}
