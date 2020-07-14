import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { TitleService } from './core/services/title-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subTitle$: Observable<string>;
  constructor(private titleService: TitleService) {
    this.subTitle$ = this.titleService.getTitle();
  }
}
