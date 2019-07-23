import { MapDirective } from './map.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GMapModule } from 'primeng/gmap';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MenuItem } from 'primeng/api';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { FiveDayWeatherComponent } from './five-day-weather/five-day-weather.component';
import { AsidePanelComponent } from './aside-panel/aside-panel.component';
import { CheckingWeatherService } from './services/checking-weather/checking-weather.service';
import { DynamicMapComponent } from './dynamic-map/dynamic-map.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    FiveDayWeatherComponent,
    AsidePanelComponent,
    DynamicMapComponent,
    MapDirective
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
    MatSlideToggleModule
  ],
  entryComponents: [DynamicMapComponent],
  providers: [CheckingWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
