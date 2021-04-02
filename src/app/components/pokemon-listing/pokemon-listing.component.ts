import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { SearchFiltersService } from 'src/app/services/search-filters.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { CollectionHandlerService } from 'src/app/services/collection-handler.service';

@UntilDestroy()
@Component({
  selector: 'app-pokemon-listing',
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListingComponent implements OnInit {
  @Output() loadComplete = new EventEmitter<string>();

  pokeList$ = combineLatest([
    this.pokeApiService.pokeList$,
    this.searchFiltersService.filters$,
  ]).pipe(
    tap(() => this.loadComplete.emit()),
    map(([results, filters]) => this.applyFilters(results, filters)),
    untilDestroyed(this)
  );

  constructor(
    private pokeApiService: PokeApiService,
    public collection: CollectionHandlerService,
    private searchFiltersService: SearchFiltersService
  ) {}

  ngOnInit(): void {}

  applyFilters(results, filters) {
    const filteredResults = results
      .map((result) => {
        let pass = true;

        Object.entries(filters)
          .filter((r) => r[1] != null)
          .every(([key, value]) => {
            switch (key) {
              case 'name':
                if (!result.name.includes((value as string).toLowerCase())) {
                  pass = false;
                  return false;
                }
                break;
              case 'number':
                if (
                  !result.id
                    .toString()
                    .includes((value as string).toLowerCase())
                ) {
                  pass = false;
                  return false;
                }
                break;
              case 'types':
                let hasMatchingType = false;

                if ((value as any)?.length > 0) {
                  (value as any).forEach((type) => {
                    if (result.types.some((t) => t.type.name === type)) {
                      hasMatchingType = true;
                    }
                  });
                }

                if (!hasMatchingType) {
                  pass = false;
                  return false;
                }
                break;
            }

            return true;
          });

        return pass ? result : null;
      })
      .filter((result) => result);

    console.log({ results, filters, filteredResults });
    return filteredResults;
  }
}
