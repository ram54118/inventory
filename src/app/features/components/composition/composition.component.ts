import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory } from './../../../models/inventory';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {
  @Input() selectedInventory: Inventory;
  public composedInventoryList: Inventory[] = [];
  public compositionForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.compositionForm = this.formBuilder.group({
      type: ['', Validators.required]
    });
  }

  submitForm() {
    this.compositionForm.reset();
    this.composedInventoryList.push(this.selectedInventory);
    this.selectedInventory = null;
  }
}
