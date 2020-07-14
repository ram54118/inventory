import { Inventory } from './../../../models/inventory';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InventoryService } from './../../../core/services/inventory.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  @Output() selectedInventory = new EventEmitter<Inventory>();
  public inventoryList: Inventory[];
  public totalinventoryList: Inventory[];
  constructor(private inventoryService: InventoryService) { }
  ngOnInit() {
    this.inventoryService.getInventoryList().pipe(tap(list => {
      this.totalinventoryList = list;
      this.inventoryList = list.slice(0, 10);
    })).subscribe();
  }

  selectInventory(inventory: Inventory) {
    this.selectedInventory.emit(inventory);
  }

  public pageChanged(selectedPage) {
    this.inventoryList = this.totalinventoryList.slice((selectedPage.page - 1) * 10, selectedPage.page * 10);
  }
}
