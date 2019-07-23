import { MatSlideEvent } from './../typings/typings.d';
import { MapDirective } from "./map.directive";
import { DynamicMapComponent } from "./dynamic-map/dynamic-map.component";
import {
  ViewChild,
  ElementRef,
  ComponentFactoryResolver,
  OnInit,
  AfterContentChecked,
  HostListener
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
    this.isSlideChecked = true;
    this.isSlideDisabled = false;
    this.isStart = true;
    this.isSlideVisible = true;


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

  header: HTMLElement;
  asideBar: HTMLElement;
  data: ICity;

  isSlideBarOpen: boolean;
  isSlideChecked: boolean;
  isSlideDisabled: boolean;
  isStart: boolean;
  isSlideVisible: boolean;

  @ViewChild("section", { read: ElementRef }) section: ElementRef;
  @ViewChild(MapDirective) gMap: MapDirective;

  ngOnInit() {
    this.asideBar = document.getElementById("aside-bar");
    this.header = document.getElementsByTagName("header")[0];

    if (window.innerWidth < 1500){
      this.isSlideVisible = false;
      this.isSlideChecked = false;
      this.isSlideDisabled = true;
    }
  }

  ngAfterContentChecked(){
    const choiceBox: HTMLElement= document.querySelector(".ui-autocomplete-panel");
    const overlayPanel: HTMLElement = document.querySelector(".ui-overlaypanel");
    if (choiceBox && overlayPanel){
      const positionOfChoiceBox: ClientRect = choiceBox.getBoundingClientRect();
      if(window.innerWidth < 560){
        overlayPanel.style.left = `5px`;
        overlayPanel.style.top = `${positionOfChoiceBox.bottom + window.scrollY}px`;
        overlayPanel.style.width = `${window.innerWidth - 10}px`;
      }else{
        overlayPanel.style.left = `${positionOfChoiceBox.left}px`;
        overlayPanel.style.top = `${positionOfChoiceBox.bottom + window.scrollY}px`;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    if(window.innerWidth < 1500){
      this.isSlideVisible = false;
      this.isSlideDisabled = true;
      if(this.isSlideBarOpen){
        this.asideBar.className = 'conteiner open-aside-bar darken';
        this.header.className = 'darken';
        this.section.nativeElement.style.paddingLeft = '0';
        this.isSlideChecked = false;
      }
    }

    if(window.innerWidth >= 1500){
      this.isSlideVisible = true;
      this.isSlideDisabled = false;
    }
  }

  toggleSection(canClose?: boolean) {
      if (!this.isSlideBarOpen) {
       if(this.isSlideChecked){
        this.section.nativeElement.style.paddingLeft = '400px'
        this.asideBar.className = 'conteiner open-aside-bar';
       }else{
        this.asideBar.className = 'conteiner open-aside-bar darken';
        this.header.className = 'darken';
       }
       this.isSlideBarOpen = !this.isSlideBarOpen;
      } else if(canClose !== false) {
        this.asideBar.className = 'conteiner close-aside-bar';
        this.header.className = '';
        this.section.nativeElement.style.paddingLeft = '0'
        this.isSlideBarOpen = !this.isSlideBarOpen;
      }
  }

  onChangeSlide(event: MatSlideEvent){
    this.isSlideChecked = event.checked;
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
