// DEPENDENCY
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { useQuery } from '@apollo/client'

// COMPONENT
import { PokemonCard } from './components/PokemonCard'
import { InputHandles, InputSearch } from './components/InputSearch'

// STYLE
import './App.css'
import './components/PokemonCard/style.css'

// SERVICE
import { GET_POKEMON } from './services/getPokemon'

// TYPE
import { DPokemonTypeQuery, IPokemonCard } from './types/pokemon'

type IQueryPokemon = {
  name: string
  id: number
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesnames: { name: string }[]
  }
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: DPokemonTypeQuery
  }[]
}

export function App() {
  const [pokemon, setPokemon] = useState<IPokemonCard | null>(null)
  const inputRef = useRef<InputHandles>(null)

  const handleSearch = (key: KeyboardEvent) => {
    if (key.code === 'Enter' || key.code === 'NumpadEnter') {
      console.log('[handleSearch]', inputRef.current?.input?.current?.value)
      refetch({ name: inputRef.current!.input?.current?.value.toLowerCase() })
      inputRef.current!.handleToggleVisible()
    }
  }

  const handleShortcut = (key: globalThis.KeyboardEvent) => {
    console.log(key.code)
    if (key.ctrlKey && key.code === 'KeyC') {
      inputRef.current?.handleToggleVisible()
    }
  }

  const {
    data: queryPokemon,
    error,
    refetch,
  } = useQuery<{ pokemon_v2_pokemon: IQueryPokemon[] }>(GET_POKEMON, {
    variables: { name: 'blastoise' },
  })

  useEffect(() => {
    // console.log('[queryPokemon]', queryPokemon)
    // console.log('[error]', error)
    if (
      queryPokemon !== undefined &&
      queryPokemon.pokemon_v2_pokemon.length > 0
    ) {
      const isFlying =
        queryPokemon!.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1]
          ?.pokemon_v2_type.name === 'flying'
          ? 1
          : 0

      setPokemon({
        id: queryPokemon!.pokemon_v2_pokemon[0].id,
        name: queryPokemon!.pokemon_v2_pokemon[0].name,
        japaneseName:
          queryPokemon!.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
            .pokemon_v2_pokemonspeciesnames[0].name,
        type: queryPokemon!.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes?.[
          isFlying
        ].pokemon_v2_type.name,
      })
    } else {
      setPokemon({
        id: 201,
        name: 'Pokemon not found',
        japaneseName: 'Not found',
        type: 'not-found',
      })
    }
  }, [queryPokemon])

  useEffect(() => {
    document.addEventListener('keyup', handleShortcut)

    return () => document.removeEventListener('keyup', handleShortcut)
  }, [])

  return (
    <div className='App'>
      <InputSearch ref={inputRef} handleSearch={handleSearch} />
      {pokemon && (
        <PokemonCard
          japaneseName={pokemon.japaneseName}
          id={pokemon.id}
          type={pokemon.type}
          name={pokemon.name}
        />
      )}
    </div>
  )
}
