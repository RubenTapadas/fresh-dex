import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PokeApiService } from './services/poke-api.service';
import { map, shareReplay, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'fresh-dex';
  loadComplete = false;

  constructor() {}

  loadCompleteTrigger() {
    this.loadComplete = true;
  }
}
