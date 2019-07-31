import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-dynamic]',
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
