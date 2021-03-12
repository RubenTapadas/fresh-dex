import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent implements OnInit {
  @Input() poke;

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

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {}
}
