export interface IAppKey {
  key: string;
}

export interface MatSlideEvent{
  checked: boolean;
}

export interface IWeatherPackage {
  picture: string;
  mainDescription: string;
  description: string;
  wind: IWind | null;
  snow: ISnow | null;
  rain: IRain | null;
  humidity: number;
  pressure: string;
  temp: string;
  time: number;
  date: string;
  text?: string;
  weatherId?: number;
  name?: string;
  country?: string;
}
export interface ISelectOption{
  value: string;
  viewValue: string;
}

///////////////////

export interface IWeather {
  coord: ICoord;
  weather:  IWeatherDetails | IWeatherDetails[];
  base: string;
  main: IMain;
  visibility: number;
  wind?: IWind;
  clouds?: IClouds;
  rain?: IRain;
  snow?: ISnow;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IForecast {
  code: string;
  message: number;
  city: ICity
  cnt: number;
  list: IList[];
}



/////////////////////////////////////

export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWeatherDetails {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMain {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface IClouds {
  all: number;
}

export interface IRain {
  '1h'?: number;
  '3h': number;
}

export interface ISnow {
  '1h'?: number;
  '3h': number;
}

export interface ISys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ICity {
  id: number;
  name: string;
  coord: ICoord
  country: string;
  timezone?: number;
}

export interface IList {
  dt: number;
  main: IMain;
  weather: IWeatherDetails;
  clouds?: IClouds;
  wind?: IWind;
  rain?: IRain;
  snow?: ISnow;
  sys?: ISys2
  dt_txt: string;
}

export interface ISys2 {
  pod: string;
}
