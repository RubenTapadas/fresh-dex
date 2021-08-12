import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { SearchFiltersService } from '../../services/search-filters.service';
import { CollectionHandlerService } from '../../services/collection-handler.service';
import {OptionsHandlerService} from '../../services/options-handler.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  types = {
    ice: '#96D9D6',
    bug: '#A6B91A',
    fire: '#EE8130',
    rock: '#B6A136',
    dark: '#705746',
    fairy: '#D685AD',
    water: '#6390F0',
    ghost: '#735797',
    grass: '#7AC74C',
    steel: '#B7B7CE',
    flying: '#A98FF3',
    ground: '#E2BF65',
    poison: '#A33EA1',
    normal: '#A8A77A',
    dragon: '#6F35FC',
    psychic: '#F95587',
    fighting: '#C22E28',
    electric: '#F7D02C',
  };

  selectedTypes = [];

  

  constructor(
    private sfs: SearchFiltersService,
    public collection: CollectionHandlerService,
    private optionsHandlerService:OptionsHandlerService
  ) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      (document.getElementById('username') as any).value = username;
    }
  }

  usernameChange(event) {
    console.log(event.target.value);
    localStorage.setItem('username', event.target.value);
  }

  changeFilter(field, value) {
    this.sfs.filters$.pipe(take(1)).subscribe((f) => {
      const newValue = value != '' ? value : null;
      this.sfs.filters$.next({ ...f, [field]: newValue });
    });
  }

  toogleSelectedTypes(type: string) {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter((v) => v !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.changeFilter('types', this.selectedTypes);
  }

  toggleCollector(collectorType: 'isCollector' | 'isShinyCollector') {
    switch (collectorType) {
      case 'isCollector':
        this.collection.isCollector$
          .pipe(take(1))
          .subscribe((c) => this.collection.isCollector$.next(!c));
        break;
      case 'isShinyCollector':
        this.collection.isShinyCollector$
          .pipe(take(1))
          .subscribe((c) => this.collection.isShinyCollector$.next(!c));
        break;
    }
  }

  changeDarkMode(isDarkMode: boolean): void{
    this.optionsHandlerService.darkMode$.next(isDarkMode)
  }
}
