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
  public columnsList: { label: string, value: string, sort?: boolean }[];
  public selectedColumn: string;
  public selectedDisposition: string;
  private subscriptions$ = new Subject<void>();
  public paginationRecords: Inventory[];
  public selectAll = false;
  public searchValue: string;
  public isColumnsInLockState: boolean;
  public dispositionTypes;
  public recordsPerScreenOptions = [5, 10, 15, 20, 25, 30];
  public recordsPerScreen = 10;
  private lockedColumns: string[] = [];
  @ViewChild('searchFilter') searchFilter;
  constructor(private inventoryService: InventoryService, private modalService: BsModalService) { }
  ngOnInit() {
    this.dispositionTypes = [
      {
        label: 'RETURN',
        value: 'return'
      },
      {
        label: 'Destroy',
        value: 'destroy'
      },
      {
        label: 'All Others',
        value: 'allOthers'
      }
    ];
    this.columnsList = [
      {
        label: 'Box Code',
        value: 'box_code',
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
      this.paginationRecords = list;
      this.inventoryList = list.slice(0, this.recordsPerScreen);
    })).subscribe();
  }

  tableRecordsChanged() {
    this.inventoryList = this.paginationRecords.slice(0, this.recordsPerScreen);
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
    if (value) {
      this.inventoryList = this.paginationRecords.filter(inventory => {
        return String(inventory[this.selectedColumn]).indexOf(value) >= 0;
      });
    } else {
      this.inventoryList = this.paginationRecords;
    }
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
    this.selectAll = false;
    this.inventoryList = this.totalinventoryList.slice((selectedPage.page - 1) * this.recordsPerScreen,
      selectedPage.page * this.recordsPerScreen);
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
    this.selectedColumn = null;
    this.searchValue = null;
  }

  showAll() {
    this.inventoryList = this.totalinventoryList.slice(0, this.recordsPerScreen);
    this.paginationRecords = this.totalinventoryList;
  }

  showDispositionedRecords() {
    this.paginationRecords = [...this.storesList, ...this.returnsList, ...this.destroyList];
    this.inventoryList = this.paginationRecords.slice(0, this.recordsPerScreen);
  }

  act(type: string) {
    if (type) {
      switch (type) {
        case ('allOthers'):
          this.selectedInventoryList.forEach(inventory => {
            const storeIndex = this.storesList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
            if (storeIndex === -1) {
              this.storesList.push(inventory);
            }

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
        case ('return'):
          this.selectedInventoryList.forEach(inventory => {
            const returnIndex = this.returnsList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
            if (returnIndex === -1) {
              this.returnsList.push(inventory);
            }

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
        case ('destroy'):
          this.selectedInventoryList.forEach(inventory => {
            const destroyIndex = this.destroyList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
            if (destroyIndex === -1) {
              this.destroyList.push(inventory);
            }
            const storesIndex = this.storesList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
            if (storesIndex >= 0) {
              this.storesList.splice(storesIndex, 1);
            }

            const retunsIndex = this.returnsList.findIndex(inventoryFromList => inventoryFromList.box_code === inventory.box_code);
            if (retunsIndex >= 0) {
              this.returnsList.splice(retunsIndex, 1);
            }
          });
          break;
      }
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

  onDispositionChange() {
    this.act(this.selectedDisposition);
  }

  showOnlyTableData(type: string) {
    switch (type) {
      case ('STORE'):
        this.paginationRecords = this.storesList;
        this.inventoryList = this.paginationRecords.slice(0, this.recordsPerScreen);
        break;
      case ('RETURN'):
        this.paginationRecords = this.returnsList;
        this.inventoryList = this.paginationRecords.slice(0, this.recordsPerScreen);
        break;
      case ('DESTROY'):
        this.paginationRecords = this.destroyList;
        this.inventoryList = this.paginationRecords.slice(0, this.recordsPerScreen);
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

  lockOrUnLockColumn(column: string) {
    if (this.isColumnsInLockState) {
      const isColumnAlreadyLocked = this.lockedColumns.find(col => col === column);
      if (!isColumnAlreadyLocked) {
        this.lockedColumns.push(column);
      }
    }
  }

  isColumnLocked(column: string): boolean {
    return !!(this.lockedColumns.find(col => col === column));
  }

  sortColumn(column: any) {
    const isNumber = column.value !== 'last_activity_date' || column.value !== 'client_container_number';
    if (!column.sort) {
      column.sort = true;
      if (isNumber) {
        this.inventoryList = this.inventoryList.sort((a, b) => Number(b[column.value]) - Number(a[column.value]));
      } else {
        this.inventoryList = this.inventoryList.sort((a, b) => a[column.value].localeCompare(b[column.value]));
      }
    } else {
      column.sort = false;
      if (isNumber) {
        this.inventoryList = this.inventoryList.sort((a, b) => Number(a[column.value]) - Number(b[column.value]));
      } else {
        this.inventoryList = this.inventoryList.sort((a, b) => b[column.value].localeCompare(a[column.value]));
      }
    }
  }
}
