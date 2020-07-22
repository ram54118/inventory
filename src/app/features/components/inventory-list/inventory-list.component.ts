import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { CompositionComponent } from '../composition/composition.component';
import { InventoryService } from './../../../core/services/inventory.service';
import { Inventory } from './../../../models/inventory';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit, AfterViewInit, OnDestroy {
  public inventoryList: Inventory[];
  public totalinventoryList: Inventory[];
  public selectedInventoryList: Inventory[] = [];
  public storesList: Inventory[] = [];
  public returnsList: Inventory[] = [];
  public destroyList: Inventory[] = [];
  public columnsList: { label: string, value: string }[];
  public selectedColumn: string;
  private subscriptions$ = new Subject<void>();
  @ViewChild('searchFilter') searchFilter;
  constructor(private inventoryService: InventoryService, private modalService: BsModalService) { }
  ngOnInit() {
    this.columnsList = [
      {
        label: 'Box Code',
        value: 'box_code'
      },
      {
        label: 'Last Activity Date',
        value: 'last_activity_date'
      },
      {
        label: 'Storage Location',
        value: 'storage_location'
      },
      {
        label: 'Container Number',
        value: 'container_number'
      },
      {
        label: 'Client Container Number',
        value: 'client_container_number'
      },
      {
        label: 'Quantity',
        value: 'quantity'
      },
      {
        label: 'Protocol Id',
        value: 'protocol_id'
      }
    ];
    this.inventoryService.getInventoryList().pipe(tap(list => {
      this.totalinventoryList = list;
      this.inventoryList = list.slice(0, 10);
    })).subscribe();
  }

  ngAfterViewInit() {
    fromEvent<any>(this.searchFilter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.subscriptions$),
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        tap(val => this.filterTableFromValue(val))
      ).subscribe();
  }

  filterTableFromValue(value: string) {
    this.inventoryList = this.totalinventoryList.filter(inventory => {
      return String(inventory[this.selectedColumn]).indexOf(value) >= 0;
    });
  }

  selectInventory(inventory: Inventory) {
    if (inventory.isSelect) {
      this.selectedInventoryList.push(inventory);
    } else {
      const inventoryIndex = this.selectedInventoryList.findIndex(selectedInventory => selectedInventory.box_code === inventory.box_code);
      this.selectedInventoryList.splice(inventoryIndex, 1);
    }
  }

  selectOrUnSelectAll(event: any) {
    if (event.target.checked) {
      this.inventoryList.forEach(inventory => inventory.isSelect = true);
      this.selectedInventoryList = this.inventoryList;
    } else {
      this.inventoryList.forEach(inventory => inventory.isSelect = false);
      this.selectedInventoryList = [];
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
    this.inventoryList = this.totalinventoryList;
  }

  act(type: string) {
    switch (type) {
      case ('STORE'):
        Array.prototype.push.apply(this.storesList, this.selectedInventoryList);
        this.selectedInventoryList.forEach(inventory => {
          const returnIndex = this.returnsList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (returnIndex >= 0) {
            this.returnsList.splice(returnIndex, 1);
          }

          const destroyIndex = this.destroyList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (destroyIndex >= 0) {
            this.destroyList.splice(destroyIndex, 1);
          }
        });
        break;
      case ('RETURN'):
        Array.prototype.push.apply(this.returnsList, this.selectedInventoryList);
        this.selectedInventoryList.forEach(inventory => {
          const storesIndex = this.storesList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (storesIndex >= 0) {
            this.storesList.splice(storesIndex, 1);
          }

          const destroyIndex = this.destroyList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (destroyIndex >= 0) {
            this.destroyList.splice(destroyIndex, 1);
          }
        });
        break;
      case ('DESTROY'):
        Array.prototype.push.apply(this.destroyList, this.selectedInventoryList);
        this.selectedInventoryList.forEach(inventory => {
          const storesIndex = this.storesList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (storesIndex >= 0) {
            this.storesList.splice(storesIndex, 1);
          }

          const destroyIndex = this.returnsList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (destroyIndex >= 0) {
            this.returnsList.splice(destroyIndex, 1);
          }
        });
        break;
    }
  }

  unAct(type: string) {
    const list = this.selectedInventoryList.map(inventory => inventory.box_code);
    switch (type) {
      case ('STORE'):
        this.selectedInventoryList.forEach(inventory => {
          const returnIndex = this.storesList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (returnIndex >= 0) {
            this.storesList.splice(returnIndex, 1);
          }
        });
        break;
      case ('RETURN'):
        this.selectedInventoryList.forEach(inventory => {
          const storesIndex = this.returnsList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (storesIndex >= 0) {
            this.returnsList.splice(storesIndex, 1);
          }
        });
        break;
      case ('DESTROY'):
        this.selectedInventoryList.forEach(inventory => {
          const storesIndex = this.destroyList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
          if (storesIndex >= 0) {
            this.destroyList.splice(storesIndex, 1);
          }
        });
        break;
    }
  }

  showOnlyTableData(type: string) {
    switch (type) {
      case ('STORE'):
        this.inventoryList = this.storesList;
        break;
      case ('RETURN'):
        this.inventoryList = this.returnsList;
        break;
      case ('DESTROY'):
        this.inventoryList = this.destroyList;
        break;
    }
  }

  selectColumn(event) {
    this.selectedColumn = event.target.value;
  }
  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
