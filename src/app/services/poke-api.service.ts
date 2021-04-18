import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, of, Observable, merge } from 'rxjs';
import {
  take,
  shareReplay,
  map,
  switchMap,
  filter,
  catchError,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { PokemonEntry } from '../models/poke-list';
import { Pokedex } from 'pokedex-promise-v2';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  pokeList$ = this.http
    .get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
    .pipe(
      take(1),
      map((v) =>
        (v as any).results?.map((pokemon) =>
          pokemon
            ? this.http
                .get(pokemon.url)
                .pipe(
                  catchError((_) => this.http.get(pokemon.url.slice(0, -1)))
                )
            : null
        )
      ),
      map((v) => v.filter((v) => v)),
      switchMap((v) => combineLatest(v)),
      map((v) => v.filter((v) => (v as any)?.is_default)),
      shareReplay(1)
    );

  /* pokeList$ = this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0`)
    .pipe(
      mergeMap(result => merge(
        this.http.get(pokemon.url).pipe(
          map((value) => {
            return pokemon ? this.http.get(pokemon.url) : null;
            }),
        )
      ))
    ).subscribe(values => {}); 

  }*/

  getPokemonByUrl(url: string): any {
    return this.http.get(url);
  }
}
