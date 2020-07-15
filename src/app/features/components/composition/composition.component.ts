import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Inventory } from './../../../models/inventory';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {
  @Input() title: string;
  @Input() selectedInventoryList: Inventory[];
  onClose: Subject<boolean>;
  viewChanges: boolean;
  public composedInventoryList: Inventory[] = [];
  constructor(public bsModalRef: BsModalRef) {
    this.onClose = new Subject<boolean>();
  }
  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

  selectComposition(event: any, inventory: Inventory) {
    inventory.composedVal = event.target.value;
    const isExistingInventory = this.composedInventoryList.find(composedInventory => composedInventory.box_code === inventory.box_code);
    if (!isExistingInventory) {
      this.composedInventoryList.push(inventory);
    }
  }
}
