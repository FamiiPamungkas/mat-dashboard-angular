import {
  AfterContentInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Injector,
  Input,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {MatError} from "@angular/material/form-field";
import {AbstractControl, FormGroupDirective} from "@angular/forms";
import {AppInputDirective} from "../../../../directive/app-input.directive";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements DoCheck, AfterContentInit {
  @Input() label: string = "";
  @Input() showPasswordToggle: boolean = true;

  @ContentChild(AppInputDirective) inputElement?: ElementRef;
  @ContentChild(MatError) matErrors?: QueryList<MatError>;

  private _onFocus: boolean = false;
  private _error: boolean = false;
  private _formControl?: AbstractControl;
  private _formGroup?: FormGroupDirective;
  private _isPassword: boolean = false;
  showPassword: boolean = false;

  constructor(
    private renderer: Renderer2,
    private injector: Injector
  ) {
  }

  ngDoCheck() {
    if (this._formControl && this._formGroup) {
      this._error = !!(this.matErrors && (this._formControl.touched || this._formGroup.submitted));
    }
    if (this._isPassword) {
      const input = this.inputElement?.nativeElement;
      input.setAttribute('type', this.showPassword ? 'text' : 'password');
    }
  }

  ngAfterContentInit(): void {
    const input = this.inputElement?.nativeElement;
    if (!input) return;

    this.renderer.listen(input, 'focus', () => {
      this.onFocus = true;
    });

    this.renderer.listen(input, 'blur', () => {
      this.onFocus = false;
    });

    const formControlName = input.getAttribute("formControlName");
    const formGroup = this.injector.get(FormGroupDirective, null);
    if (formGroup) {
      this._formGroup = formGroup;
      const control = formGroup.control.get(formControlName);
      if (control) {
        this._formControl = control;
      }
    }

    this._isPassword = input.getAttribute('type') == "password";
    this.showPasswordToggle = (this.showPasswordToggle && this._isPassword);
  }

  get onFocus(): boolean {
    return this._onFocus;
  }

  set onFocus(value: boolean) {
    this._onFocus = value;
  }

  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
