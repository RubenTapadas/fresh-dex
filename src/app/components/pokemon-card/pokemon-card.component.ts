import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CollectionHandlerService } from 'src/app/services/collection-handler.service';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent implements OnInit {
  @Input() poke;

  inCollection$ = this.collection.collectionList$.pipe(
    untilDestroyed(this),
    map((list) => list.includes(this.poke.id))
  );

  inShinyCollection$ = this.collection.shinyCollectionList$.pipe(
    untilDestroyed(this),
    map((list) => list.includes(this.poke.id))
  );

  colors = {
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

  constructor(public collection: CollectionHandlerService) {}

  ngOnInit(): void {}
}
