import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PokeApiService } from './services/poke-api.service';
import { map, shareReplay, take } from 'rxjs/operators';
import {OptionsHandlerService} from './services/options-handler.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'fresh-dex';
  loadComplete = false;

  darkMode$ = this.optionsHandlerService.darkMode$;

  constructor(
    private optionsHandlerService:OptionsHandlerService
    ) {}

  loadCompleteTrigger() {
    this.loadComplete = true;
  }
}
