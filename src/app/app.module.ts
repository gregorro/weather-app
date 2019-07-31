import { HourlyWeatherMessageService } from './services/hourly-weather-event-service/hourly-weather-event-service';
import { CheckingWeatherService } from "./services/checking-weather/checking-weather.service";

import { DynamicComponentDirective } from "./map.directive";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { FormsModule } from "@angular/forms";
import { ListboxModule } from "primeng/listbox";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { GMapModule } from "primeng/gmap";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TooltipModule } from "primeng/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ChartModule } from 'primeng/chart';
// import { MenuItem } from 'primeng/api';

import { AppComponent } from "./app.component";
import { CurrentWeatherComponent } from "./current-weather/current-weather.component";
import { WeatherContainer } from "./weather - container/weather-container.component";
import { AsidePanelComponent } from "./aside-panel/aside-panel.component";
import { DynamicMapComponent } from "./dynamic-map/dynamic-map.component";
import { FiveDaysComponent } from "./five-days/five-days.component";
import { HourComponent } from "./hour/hour.component";
import { ChangeChartComponent } from './change-chart/change-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherContainer,
    AsidePanelComponent,
    DynamicMapComponent,
    DynamicComponentDirective,
    FiveDaysComponent,
    HourComponent,
    ChangeChartComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AutoCompleteModule,
    FormsModule,
    ListboxModule,
    InputTextModule,
    ButtonModule,
    GMapModule,
    OverlayPanelModule,
    MatSelectModule,
    MatSlideToggleModule,
    TooltipModule,
    MatSnackBarModule,
    ChartModule
  ],
  entryComponents: [
    DynamicMapComponent,
    FiveDaysComponent,
    HourComponent,
    ChangeChartComponent
  ],
  providers: [CheckingWeatherService, HourlyWeatherMessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
