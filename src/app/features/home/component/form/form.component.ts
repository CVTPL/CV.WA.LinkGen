import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  WaLinkForm!: FormGroup;
  generatedLink: any;
  copymsg: boolean = false;
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.WaLinkForm = new FormGroup({
      wanumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
        ),
      ]),
      watext: new FormControl(''),
    });
  }

  onSubmit() {
    var urlprefix = 'https://wa.me/';
    var querystring = '?text=';
    var numval = this.wavalue.controls['wanumber'].value;
    var textval = this.wavalue.controls['watext'].value;
    console.log(numval);
    console.log(textval);

    var final = urlprefix + numval + querystring + textval;

    console.log(final);

    this.generatedLink = final;
  }

  copyfun(event: any) {
    console.log(event);
    if (event) {
      this.copymsg = true;
      // this.openSnackBar();
    } else {
      this.copymsg = false;
    }
  }
  // getErrorMessage() {
  //   return this.wanumber.hasError('required')
  //     ? 'This field is required.'
  //     : this.wanumber.hasError('pattern')
  //     ? 'This phone number is invalid.'
  //     : '';
  // }
  get wanumber(): FormControl {
    return this.WaLinkForm.get('wanumber') as FormControl;
  }
  get wavalue() {
    return this.WaLinkForm;
  }
  durationInSeconds = 5;
  // openSnackBar() {
  //   this._snackBar.openFromComponent(FormComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['green-snackbar'],
    });
  }
}
