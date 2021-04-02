import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CollectionHandlerService {
  isCollector$ = new BehaviorSubject<boolean>(
    localStorage.getItem('isCollector') === 'true'
  );
  isShinyCollector$ = new BehaviorSubject<boolean>(
    localStorage.getItem('isShinyCollector') === 'true'
  );

  collectionList$ = new BehaviorSubject<number[]>(
    this.getList('collectionList')
  );
  shinyCollectionList$ = new BehaviorSubject<number[]>(
    this.getList('shinyCollectionList')
  );

  constructor() {
    this.isCollector$.pipe(untilDestroyed(this)).subscribe((v) => {
      localStorage.setItem('isCollector', v + '');
    });
    this.isShinyCollector$.pipe(untilDestroyed(this)).subscribe((v) => {
      localStorage.setItem('isShinyCollector', v + '');
    });
  }

  getList(list: string) {
    return JSON.parse(localStorage.getItem(list)) ?? [];
  }

  updateList(list: string, pokemonId: number) {
    let collectionList = JSON.parse(localStorage.getItem(list)) || [];

    if (!collectionList.includes(pokemonId)) {
      collectionList.push(pokemonId);
    } else if (collectionList.includes(pokemonId)) {
      collectionList = collectionList.filter((id) => id !== pokemonId);
    }

    switch (list) {
      case 'collectionList':
        this.collectionList$.next(collectionList);
        break;
      case 'shinyCollectionList':
        this.shinyCollectionList$.next(collectionList);
        break;
    }
    localStorage.setItem(list, JSON.stringify(collectionList));
    console.log({ collectionList });
  }
}
