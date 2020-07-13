import { TABLIST } from './../../../constants/constants';
import { Tab } from './../../../models/tab';

import { OnInit, Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() tabChanged: EventEmitter<string> = new EventEmitter<string>();
  public selectedTab: string;
  public tabsList: Tab[];
  ngOnInit() {
    this.tabsList = TABLIST;
    this.selectedTab = 'clients';
  }

  selectTab(value: string) {
    this.selectedTab = value;
    this.tabChanged.emit(value);
  }
}
