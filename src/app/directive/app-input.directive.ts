import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appInput]',
  exportAs: 'appInput'
})
export class AppInputDirective extends ElementRef<HTMLInputElement> {

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
    super(elementRef.nativeElement)
  }

}
