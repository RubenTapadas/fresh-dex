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
    fire: '#fb8c00',
    flying: '#00bcd4',
    dark: '#fff',
    electric: '#fff',
    ghost: '#fff',
    grass: '#fff',
    ground: '#fff',
    ice: '#fff',
    poison: '#fff',
    rock: '#fff',
    steel: '#fff',
    normal: '#fff',
    fighting: '#fff',
    psychic: '#fff',
    bug: '#fff',
    dragon: '#fff',
    fairy: '#fff',
    water: '#fff',
  };

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {}
}
