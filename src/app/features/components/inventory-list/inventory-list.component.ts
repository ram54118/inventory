import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';
import { CompositionComponent } from '../composition/composition.component';
import { InventoryService } from './../../../core/services/inventory.service';
import { Inventory } from './../../../models/inventory';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  public inventoryList: Inventory[];
  public totalinventoryList: Inventory[];
  public selectedInventoryList: Inventory[] = [];
  public storesList: number[] = [];
  public returnsList: number[] = [];
  public destroyList: number[] = [];
  constructor(private inventoryService: InventoryService, private modalService: BsModalService) { }
  ngOnInit() {

    this.inventoryService.getInventoryList().pipe(tap(list => {
      this.totalinventoryList = list;
      this.inventoryList = list.slice(0, 10);
    })).subscribe();
  }

  selectInventory(inventory: Inventory) {
    if (inventory.isSelect) {
      this.selectedInventoryList.push(inventory);
    } else {
      const inventoryIndex = this.selectedInventoryList.findIndex(selectedInventory => selectedInventory.box_code === inventory.box_code);
      this.selectedInventoryList.splice(inventoryIndex, 1);
    }
  }

  public pageChanged(selectedPage) {
    this.inventoryList = this.totalinventoryList.slice((selectedPage.page - 1) * 10, selectedPage.page * 10);
  }

  public editInventory() {
    const initialState = {
      title: 'Inventory List',
      selectedInventoryList: JSON.parse(JSON.stringify(this.selectedInventoryList)),
    };
    const modalRef = this.modalService.show(CompositionComponent, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-xl',
      initialState
    });
    modalRef.content.onClose.subscribe((response) => {
      if (response) {
      }
    });
  }

  reset() {
    this.storesList = [];
    this.returnsList = [];
    this.destroyList = [];
  }

  act(type: string) {
    const list = this.selectedInventoryList.map(inventory => inventory.box_code);
    switch (type) {
      case ('STORE'):
        Array.prototype.push.apply(this.storesList, list);
        list.forEach(id => {
          const returnIndex = this.returnsList.findIndex(incomingId => incomingId === id);
          if (returnIndex >= 0) {
            this.returnsList.splice(returnIndex, 1);
          }

          const destroyIndex = this.destroyList.findIndex(incomingId => incomingId === id);
          if (destroyIndex >= 0) {
            this.destroyList.splice(destroyIndex, 1);
          }
        });
        break;
      case ('RETURN'):
        Array.prototype.push.apply(this.returnsList, list);
        list.forEach(id => {
          const storesIndex = this.storesList.findIndex(incomingId => incomingId === id);
          if (storesIndex >= 0) {
            this.storesList.splice(storesIndex, 1);
          }

          const destroyIndex = this.destroyList.findIndex(incomingId => incomingId === id);
          if (destroyIndex >= 0) {
            this.destroyList.splice(destroyIndex, 1);
          }
        });
        break;
      case ('DESTROY'):
        Array.prototype.push.apply(this.destroyList, list);
        list.forEach(id => {
          const storesIndex = this.storesList.findIndex(incomingId => incomingId === id);
          if (storesIndex >= 0) {
            this.storesList.splice(storesIndex, 1);
          }

          const destroyIndex = this.destroyList.findIndex(incomingId => incomingId === id);
          if (destroyIndex >= 0) {
            this.destroyList.splice(destroyIndex, 1);
          }
        });
        break;
    }
  }
}
