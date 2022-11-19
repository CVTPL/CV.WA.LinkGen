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
      wanumber: new FormControl('', [Validators.required]),
      watext: new FormControl(''),
    });
  }

  onSubmit() {
    var urlprefix = 'https://wa.me/';
    var querystring = '?text=';
    var numval = this.wavalue.controls['wanumber'].value;
    var textval = this.wavalue.controls['watext'].value;
    // console.log(numval);
    // console.log(textval);

    var final = urlprefix + numval + querystring + textval;

    //console.log(final);

    this.generatedLink = final;
  }

  copyfun(event: any) {
    //console.log(event);
    if (event) {
      this.copymsg = true;
    } else {
      this.copymsg = false;
    }
  }

  get wanumber(): FormControl {
    return this.WaLinkForm.get('wanumber') as FormControl;
  }
  get wavalue() {
    return this.WaLinkForm;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['green-snackbar'],
    });
  }
  keyPressNumbers(event: any) {
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }
  }
}
