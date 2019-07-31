import { Input } from "@angular/core";
import { IChartInfoPack } from "./../../typings/typings.d";
import { Component, OnInit } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";
import { HourlyWeatherMessageService } from '../services/hourly-weather-event-service/hourly-weather-event-service';

export type LabelsSize = "big"  | "small";

@Component({
  selector: "app-change-chart",
  templateUrl: "./change-chart.component.html",
  styleUrls: ["./change-chart.component.scss"]
})
export class ChangeChartComponent implements OnInit {
  constructor(private appInfoService: HourlyWeatherMessageService) {
    this.appInfoService.currentWeatherColorScheme ? null : this.appInfoService.currentWeatherColorScheme = 'white';
  }


  @Input() data: IChartInfoPack;
  chartData: any;
  options: any;
  labelsSize: LabelsSize;

  ngOnInit() {
    this.chartData = {
      labels: [],
      datasets: [
        {
          label: this.data.name,
          data: []
        }
      ]
    } as ChartData;

    this.options = {
      title: {
        display: true,
        text: `${this.data.name} change`,
        fontSize: 16,
        fontColor: this.appInfoService.currentWeatherColorScheme
      },
      legend: {
        position: "bottom",
        labels: {
          fontColor: this.appInfoService.currentWeatherColorScheme
        }
      },
      tooltips: {
        titleFontStyle: this.appInfoService.currentWeatherColorScheme,
        bodyFontColor: this.appInfoService.currentWeatherColorScheme,
        footerFontColor: this.appInfoService.currentWeatherColorScheme
      },
      elements: {
        line: {
          borderColor: this.appInfoService.currentWeatherColorScheme
        },
        point: {
          borderColor: this.appInfoService.currentWeatherColorScheme
        },
        arc: {
          borderColor: this.appInfoService.currentWeatherColorScheme
        },
        rectangle: {
          borderColor: this.appInfoService.currentWeatherColorScheme
        }
      },
      scales: {
        scaleLabel: {
          fontColor: this.appInfoService.currentWeatherColorScheme
        },
        gridLines: {
          color: this.appInfoService.currentWeatherColorScheme,
          zeroLineColor: this.appInfoService.currentWeatherColorScheme
        },
        xAxes: [
          {
            gridLines: {
              color: this.appInfoService.currentWeatherColorScheme
            },
            ticks: {
              minor: {
                fontColor: this.appInfoService.currentWeatherColorScheme
              },
              major: {
                fontColor: this.appInfoService.currentWeatherColorScheme
              }
            },
            scaleLabel: {
              fontColor: this.appInfoService.currentWeatherColorScheme
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: this.appInfoService.currentWeatherColorScheme
            },
            ticks: {
              minor: {
                fontColor: this.appInfoService.currentWeatherColorScheme
              },
              major: {
                fontColor: this.appInfoService.currentWeatherColorScheme
              }
            },
            scaleLabel: {
              fontColor: this.appInfoService.currentWeatherColorScheme
            }
          }
        ]
      }
    } as ChartOptions;

    for (let weather of this.data.weather.list) {
      switch (this.data.name) {
        case "Temperature":
          this.chartData.datasets[0].data.push(
            (weather.main.temp - 273.15).toFixed(2)
          );
          break;
        case "Pressure":
          this.chartData.datasets[0].data.push(weather.main.pressure);
          break;
        case "Humidity":
          this.chartData.datasets[0].data.push(weather.main.humidity);
          break;
        case "Clouds":
          this.chartData.datasets[0].data.push(weather.clouds.all);
          break;
        case "Rain":
          this.chartData.datasets[0].data.push(
            weather.rain ? weather.rain["3h"] : 0
          );
          break;
        case "Snow":
          this.chartData.datasets[0].data.push(
            weather.snow ? weather.snow["3h"] : 0
          );
          break;
      }

      this.chartData.labels.push(
        new Date(weather.dt_txt).toLocaleDateString("en-US", {
          day: "2-digit",
          hour: "numeric"
        })
      );
    }
  }
}
