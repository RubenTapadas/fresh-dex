import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, of, Observable } from 'rxjs';
import { take, shareReplay, map, switchMap, filter } from 'rxjs/operators';
import { PokemonEntry } from '../models/poke-list';
import { Pokedex } from 'pokedex-promise-v2';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  pokeList$ = this.http
    .get(`https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0`)
    .pipe(
      take(1),
      map((v) => (v as any).results),
      map((v) =>
        v.map((pokemon) => {
          return pokemon ? this.http.get(pokemon.url) : null;
        })
      ),
      map((v) => v.filter((v) => v)),
      switchMap((v) => {
        return combineLatest(v);
      }),
      map((v) => v.filter((v) => (v as any).is_default)),
      shareReplay(1)
    );

  getPokemonByUrl(url: string): any {
    return this.http.get(url);
  }
}
