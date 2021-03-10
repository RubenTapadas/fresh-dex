import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-listing',
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListingComponent implements OnInit {
  pokeList$ = this.pokeApiService.pokeList$;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeList$.pipe(take(1)).subscribe((v) => console.log({ v }));
  }
}
