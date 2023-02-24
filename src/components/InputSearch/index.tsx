// DEPENDENCY
import {
  forwardRef,
  KeyboardEvent,
  InputHTMLAttributes,
  useState,
  useCallback,
  useImperativeHandle,
} from 'react'

// STYLE
import './style.css'

// TYPE
interface IInpurSearch extends InputHTMLAttributes<HTMLInputElement> {
  handleSearch: (key: KeyboardEvent<HTMLInputElement>) => void
}

export interface InputHandles extends InputHTMLAttributes<HTMLInputElement> {
  handleToggleVisible: () => void
}

export const InputSearch = forwardRef<InputHandles, IInpurSearch>(
  ({ handleSearch, ...rest }, ref): JSX.Element | null => {
    const [visible, setVisible] = useState(false)

    const handleToggleVisible = useCallback(() => {
      setVisible((prevState) => !prevState)
    }, [])

    useImperativeHandle(ref, () => {
      return {
        handleToggleVisible,
      }
    })

    if (!visible) {
      return null
    }

    return (
      <div className='overlay'>
        <input
          className='search bounce-in-fwd'
          type='text'
          placeholder='search'
          autoFocus
          onKeyDown={handleSearch}
          {...rest}
        />
      </div>
    )
  }
)
