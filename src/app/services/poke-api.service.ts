import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { take, shareReplay, map, switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  pokeList$ = this.http
    .get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
    .pipe(
      take(1),
      map((v) => (v as any).results),
      map((v) =>
        v.map((pokemon) => {
          return pokemon
            ? this.http.get(
                'https://pokeapi.co/api/v2/pokemon/' + pokemon.name + '/'
              )
            : null;
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
    console.log(url);
    return this.http.get(url);
  }
}
