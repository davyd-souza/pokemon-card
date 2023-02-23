// DEPENDENCY
import { gql } from '@apollo/client'

export const GET_POKEMON = gql`
  query samplePokeAPIquery($name: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      name
      id
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 1 } }) {
          name
          language_id
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`
