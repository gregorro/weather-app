import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class HourlyWeatherMessageService {
  constructor() {}

  private _subject = new Subject<string>();
  public currentWeatherColorScheme: string;

  sendMessageWithDayToSet(message: string) {
    this._subject.next(message);
  }

  getMessageWithDayToSet(): Observable<string> {
    return this._subject.asObservable();
  }

  clearMessageWithDayToSet() {
    this._subject.next();
  }
}
