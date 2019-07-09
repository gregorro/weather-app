import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-map]',
})
export class MapDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
