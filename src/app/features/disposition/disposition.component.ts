import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TitleService } from './../../core/services/title-service';
import { Inventory } from './../../models/inventory';

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
  inventory: Inventory;
  constructor(private titleService: TitleService) { }
  ngOnInit() {
    this.titleService.setTitle('Disposition Report Mode');
  }
}
