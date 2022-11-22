import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from 'src/app/core/commonservices/location.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  WaLinkForm!: FormGroup;
  generatedLink: any;
  copymsg: boolean = false;
  DialCode: any;
  CountryCode: any;
  constructor(
    private _snackBar: MatSnackBar,
    private LocServ: LocationService
  ) {}

  ngOnInit(): void {
    this.WaLinkForm = new FormGroup({
      wanumber: new FormControl('', [Validators.required]),
      watext: new FormControl('Hello there!'),
    });
    this.LocServ.get().subscribe((res) => {
      this.CountryCode = res.country_code.toLowerCase();
    });
  }

  onSubmit() {
    var urlprefix = 'https://wa.me/';
    var querystring = '?text=';
    var numval = this.wavalue.controls['wanumber'].value;
    var textval = this.wavalue.controls['watext'].value;
    var final = urlprefix + this.DialCode + numval + querystring + textval;
    this.generatedLink = final;
  }

  copyfun(event: any) {
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
  onPaste(event: ClipboardEvent) {
    var pastedValue = event.clipboardData?.getData('text');

    var firstchar = pastedValue?.substring(0, 1);

    if (firstchar == '+') {
      var newpastedvalue = pastedValue?.substring(pastedValue.indexOf(' ') + 1);
    } else if (firstchar == '0') {
      var newpastedvalue = pastedValue?.substring(pastedValue.indexOf('0') + 1);
    } else {
      var newpastedvalue = pastedValue;
    }

    var newVal = newpastedvalue?.replace(/[^A-Z0-9]+/gi, '');

    setTimeout(() => {
      this.WaLinkForm.patchValue({
        wanumber: newVal,
      });
    }, 100);
  }

  telInputObject(obj: any) {
    setTimeout(() => {
      this.DialCode = obj.s.dialCode;
      obj.setCountry(this.CountryCode);
    }, 500);
  }
  onCountryChange(event: any) {
    this.DialCode = event.dialCode;
  }
}
