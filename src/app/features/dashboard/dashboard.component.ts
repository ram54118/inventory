import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './../../models/client';
import { TitleService } from 'src/app/core/services/title-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public clientsList$: Observable<Client[]>;
  public view: string;

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.view = 'clients';
    this.titleService.setTitle('Dashboard');
  }

  public viewChanged(selectedTab: string) {
    this.view = selectedTab;
  }

  trackByClient(index: number, client: any): string {
    return client.MASTER_CLIENT_ID;
  }
}
