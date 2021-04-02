export interface PokemonEntry {
  id: number;
  name: string;
  evolutionFoward?: PokemonEntry;
}
