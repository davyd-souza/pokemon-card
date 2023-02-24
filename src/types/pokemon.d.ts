export interface DPokemonType {
  type:
    | 'normal'
    | 'dark'
    | 'bug'
    | 'dragon'
    | 'electric'
    | 'fairy'
    | 'fighting'
    | 'fire'
    | 'flying'
    | 'ghost'
    | 'grass'
    | 'ground'
    | 'ice'
    | 'poison'
    | 'psychic'
    | 'rock'
    | 'steel'
    | 'water'
    | 'not-found'
}

export interface DPokemonTypeQuery {
  name:
    | 'normal'
    | 'dark'
    | 'bug'
    | 'dragon'
    | 'electric'
    | 'fairy'
    | 'fighting'
    | 'fire'
    | 'flying'
    | 'ghost'
    | 'grass'
    | 'ground'
    | 'ice'
    | 'poison'
    | 'psychic'
    | 'rock'
    | 'steel'
    | 'water'
}

export interface IPokemonCard extends DPokemonType {
  id: number | null
  name: string | null
  type: string | null
  japaneseName: string | null
}
