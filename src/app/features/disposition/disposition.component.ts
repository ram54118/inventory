import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-disposition',
  templateUrl: './disposition.component.html',
  styleUrls: ['./disposition.component.scss']
})
export class DispositionComponent implements OnInit {
  compositionForm: FormGroup;
  constructor(private fromBuilder: FormBuilder) { }
  ngOnInit() {
    this.compositionForm = new FormGroup({
      type: new FormControl('', Validators.required)
    });
  }


  submit() {
    console.log(this.compositionForm.value);
  }
}
