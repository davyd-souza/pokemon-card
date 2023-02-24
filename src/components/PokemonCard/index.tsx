// STYLE
import './style.css'

// HOOK
import { useMousePosition } from '../../hooks/useMousePosition'

// TYPE
import { IPokemonCard } from '../../types/pokemon'

// UTIL
const padToThree = (id: number) => (id <= 999 ? `00${id}`.slice(-3) : id)

export function PokemonCard({
  japaneseName = 'Not found',
  id = 221,
  type = 'not-found',
  name = 'Pokemon not found',
}: IPokemonCard) {
  const { x, y } = useMousePosition()

  return (
    <div className='pokemon-card'>
      <div
        className='pokemon-card__content'
        data-type={type}
        style={{ transform: `rotateY(${x}deg) rotateX(${y}deg)` }}
      >
        <img
          className='pokemon-card__img'
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padToThree(
            id!
          )}.png`}
          alt={name!}
        />
        <h2 className='pokemon-card__title'>{japaneseName}</h2>
      </div>
    </div>
  )
}
