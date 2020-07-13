import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-disposition',
  templateUrl: './disposition.component.html',
  styleUrls: ['./disposition.component.scss']
})
export class DispositionComponent implements OnInit {
  compositionForm: FormGroup;
  tableList: any;
  selectedRow: any;
  composedRows: any = [];
  constructor(private fromBuilder: FormBuilder) { }
  ngOnInit() {
    this.compositionForm = new FormGroup({
      type: new FormControl('', Validators.required)
    });
    this.tableList = [{
      client: '4 SC AG',
      protocol: '4SC-205-1-2009',
      facility: 'Aleton',
      partId: '1609841'
    },
    {
      client: '4 SC AG1',
      protocol: '4SC-205-1-2009',
      facility: 'Aleton',
      partId: '1609842'
    },
    {
      client: '4 SC AG2',
      protocol: '4SC-205-1-2009',
      facility: 'Aleton',
      partId: '1609843'
    }];
  }


  submit() {
    this.compositionForm.reset();
    this.composedRows.push(this.selectedRow);
    this.selectedRow = null;
  }

  selectRow(row) {
    this.selectedRow = row;
  }
}
