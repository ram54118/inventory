import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TitleService } from './../../core/services/title-service';

@Component({
  selector: 'app-disposition',
  templateUrl: './disposition.component.html',
  styleUrls: ['./disposition.component.scss']
})
export class DispositionComponent implements OnInit, AfterViewInit {
  constructor(private titleService: TitleService) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.titleService.setTitle('Disposition Report Mode');
  }
}
