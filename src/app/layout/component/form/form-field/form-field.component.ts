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
  @Input() suggestions: string[] = [];

  @ContentChild(AppInputDirective) inputElement?: ElementRef;
  @ContentChild(MatError) matErrors?: QueryList<MatError>;

  private _onFocus: boolean = false;
  private _error: boolean = false;
  private _formControl?: AbstractControl;
  private _formGroup?: FormGroupDirective;
  private _isPassword: boolean = false;

  showPassword: boolean = false;
  alikeSuggestion: string[] = [];
  suggestionFocusList: number[] = []

  constructor(
    private renderer: Renderer2,
    private injector: Injector
  ) {
  }

  ngDoCheck() {
    const input = this.inputElement?.nativeElement;
    if (this._formControl && this._formGroup) {
      this._error = !!(this.matErrors && (this._formControl.touched || this._formGroup.submitted));
    }

    if (input) {
      if (this._isPassword) {
        input.setAttribute('type', this.showPassword ? 'text' : 'password');
      }
    }
  }

  ngAfterContentInit(): void {
    const input = this.inputElement?.nativeElement;
    if (!input) return;
    input.addEventListener('input', this.onInputChanges.bind(this));
    input.addEventListener('focus', () => {
      this.onFocus = true
    });
    input.addEventListener('blur', () => {
      setTimeout(() => {
        this.onFocus = false
      }, 150)
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

  get showSuggestion(): boolean {
    return (this.alikeSuggestion.length > 0) && (this.suggestionOnFocus || this.onFocus);
  }

  get suggestionOnFocus(): boolean {
    return this.suggestionFocusList.length > 0;
  }

  selectSuggestion(value: string) {
    const input = this.inputElement?.nativeElement;
    if (input) {
      this.suggestionFocusList = [];
      input.value = value
    }
  }

  onInputChanges(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.length >= 2) {
      this.alikeSuggestion = this.suggestions.filter(s => s.toLowerCase().startsWith(inputValue.toLowerCase()))
    } else {
      this.alikeSuggestion = [];
    }
  }

  suggestionFocus(num: number) {
    this.suggestionFocusList.push(num);
  }

  suggestionBlur() {
    setTimeout(() => {
      this.suggestionFocusList.pop();
    }, 150)
  }
}
