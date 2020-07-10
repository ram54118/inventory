import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { InventoryService } from './../../core/services/inventory.service';
import { Client } from './../../models/client';
import { Tab } from './../../models/tab';
import { TABLIST } from './../../constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  public clientsList$: Observable<Client[]>;
  public view: string;

  // public selected;
  // bsModalRef: BsModalRef;
  // public clientProtocols = [];
  // selectedClient;
  // tableData;
  // tableDataFullList;
  // filtersSelected = false;
  // filtersForm: FormGroup;
  // selectedFilters = [];
  // tableOptions = [{
  //   name: 'Protocol',
  //   value: 'Protocol'
  // },
  // {
  //   name: 'Template Name',
  //   value: 'Template Name'
  // },
  // {
  //   name: 'Status',
  //   value: 'Status'
  // },
  // {
  //   name: 'Consignee',
  //   value: 'Consignee'
  // },
  // {
  //   name: 'Language',
  //   value: 'Language'
  // },
  // {
  //   name: 'Active/Inactive',
  //   value: 'Active/Inactive'
  // }];

  // relationOptions = [
  //   {
  //     name: 'AND',
  //     value: 'AND'
  //   },
  //   {
  //     name: 'OR',
  //     value: 'OR'
  //   }
  // ];

  // relation2Options = [
  //   {
  //     name: 'Is',
  //     value: 'Is'
  //   },
  //   {
  //     name: 'Is not',
  //     value: 'Is not'
  //   }
  //   ,
  //   {
  //     name: 'Contains',
  //     value: 'Contains'
  //   }
  //   ,
  //   {
  //     name: 'Does Not Contain',
  //     value: 'Does Not Contain'
  //   }
  // ];

  // filtersSub: Subscription;
  // clientProtocolsTemp = [];
  // clientProtocolsCount = 30;
  // searchApplied: boolean;
  // @ViewChild('searchClients') searchClients: ElementRef;

  constructor(private modalService: BsModalService, private inventoryService: InventoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.view = 'clients';
    // this.clientsList$ = this.inventoryService.getclients();
    // this.inventoryService.getclients();
    // this.inventoryService.getProtocols().subscribe((response: any) => {
    //   if (response) {
    //     this.clientProtocolsTemp = response;
    //     this.clientProtocols = response.slice(0, this.clientProtocolsCount);
    //   }
    // });

    // this.filtersForm = this.formBuilder.group({
    //   filters: this.formBuilder.array([this.newFilter(true)])
    // });


    // this.filtersSub = this.filters.valueChanges.pipe(distinctUntilChanged(), debounceTime(200)).subscribe((form) => {
    //   if (this.filters.controls.some((group) => group.valid)) {
    //     this.selectedFilters = [];
    //     this.buildFilters(this.filters.controls);
    //   } else {
    //     this.selectedFilters = [];
    //   }
    // });
  }

  public viewChanged(selectedTab: string) {
    this.view = selectedTab;
  }

  ngAfterViewInit() {
    // fromEvent<any>(this.searchClients.nativeElement, 'keyup').pipe(map(event => event.target.value), startWith(''),
    //   debounceTime(400), distinctUntilChanged()).subscribe((search) => {
    //     if (search) {
    //       this.searchApplied = true;
    //       this.clientProtocols = this.clientProtocolsTemp.filter((protocol) => protocol.MASTER_CLIENT_NAME.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    //     } else {
    //       this.searchApplied = false;
    //       this.clientProtocolsCount = 30;
    //       this.clientProtocols = this.clientProtocolsTemp.slice(0, this.clientProtocolsCount);
    //     }
    //   });
  }

  trackByClient(index: number, client: any): string {
    return client.MASTER_CLIENT_ID;
  }
  showMoreProtocols() {
    // this.clientProtocolsCount += 30;
    // this.clientProtocols = this.clientProtocolsTemp.slice(0, this.clientProtocolsCount);
  }

  ngOnDestroy() {
    // this.filtersSub.unsubscribe();
  }

  buildFilters(formGroup: any) {
    // formGroup.filter((group) => {
    //   if (group.valid) {
    //     this.selectedFilters.push(`${group.value.tableOptions} ${group.value.relation2} ${group.value.searchOptions}`);
    //   }
    // });
  }

  // get filters(): FormArray {
  //   return this.filtersForm.get("filters") as FormArray
  // }
  newFilter(isFirstFilter: boolean) {
    // return this.formBuilder.group({
    //   'relation': [isFirstFilter ? null : 'AND'],
    //   'tableOptions': [null, Validators.required],
    //   'relation2': [null, Validators.required],
    //   'searchOptions': [null, Validators.required],
    // });
  }

  addFilterControl() {
    //  this.filters.push(this.newFilter(false));
  }

  removeFilterControl(index: number) {
    // this.filters.removeAt(index);
  }

  clearFilters(index: number) {
    // if (index !== 0) {
    //   this.removeFilterControl(index);
    // }
  }

  openCreateTemplateModal() {
    // this.datacoreService.getProtocolsByClientId(this.selectedClient.MASTER_CLIENT_ID).subscribe((protocols) => {
    //   const initialState = {
    //     title: 'Create Template',
    //     protocols: protocols,
    //     clientID: this.selectedClient.MASTER_CLIENT_ID
    //   };
    //   this.bsModalRef = this.modalService.show(CreateTemplateComponent, {
    //     backdrop: 'static',
    //     keyboard: false,
    //     class: 'modal-xl',
    //     initialState
    //   });
    //   this.bsModalRef.content.onClose.subscribe((response) => {
    //     if (response) {
    //       this.searchTableData();
    //     }
    //   });
    // });

  }
  selectClient(client) {

    // this.clientProtocols.filter(protocol => protocol.selected = false);
    // client.selected = true;
    // this.selectedClient = client;

  }

  clearClient() {
    // this.clientProtocols.filter(protocol => protocol.selected = false);
    // this.selectedClient = null;
  }

  searchTableData() {
    // this.datacoreService.getTemplates(this.selectedClient.MASTER_CLIENT_ID).subscribe((response: any) => {
    //   this.tableData = response;
    //   this.tableDataFullList = response;
    //   this.tableData = response.slice(0, 10);
    // });
  }

  getTableValue(index) {
    // return !!this.filters.controls[index].value.tableOptions;
  }
  deleteTemplate(template_id: number) {
    // this.datacoreService.deleteTemplate(template_id).subscribe(res => this.searchTableData());
  }

  editTemplate(template_id: number) {
    // this.datacoreService.getProtocolsByClientId(this.selectedClient.MASTER_CLIENT_ID).subscribe((protocols) => {
    //   this.datacoreService.getTemplateById(template_id).subscribe((data) => {
    //     const template = data[0];
    //     const initialState = {
    //       title: 'Edit Template',
    //       protocols: protocols,
    //       template,
    //       clientID: this.selectedClient.MASTER_CLIENT_ID
    //     };
    //     this.bsModalRef = this.modalService.show(CreateTemplateComponent, {
    //       backdrop: 'static',
    //       keyboard: false,
    //       class: 'modal-xl',
    //       initialState
    //     });
    //     this.bsModalRef.content.onClose.subscribe((response) => {
    //       if (response) {
    //         this.searchTableData();
    //       }
    //     });
    //   });
    // });
  }

  openSmsModal() {
    // const initialState = {
    //   title: 'Send SMS',
    // };
    // this.bsModalRef = this.modalService.show(SmsComponent, {
    //   backdrop: 'static',
    //   keyboard: false,
    //   class: 'modal-xl',
    //   initialState
    // });
    // this.bsModalRef.content.onClose.subscribe((response) => {
    //   if (response) {
    //   }
    // });
  }

  public pageChanged(selectedPage) {
    // this.tableData = this.tableDataFullList.slice((selectedPage.page - 1) * 10, selectedPage.page * 10);
  }

}
