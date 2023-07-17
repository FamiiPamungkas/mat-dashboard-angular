import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'input[appInput]',
  exportAs: 'appInput'
})
export class AppInputDirective extends ElementRef<HTMLInputElement> {

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
    super(elementRef.nativeElement)
  }

}
