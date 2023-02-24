// DEPENDENCY
import {
  forwardRef,
  KeyboardEvent,
  InputHTMLAttributes,
  useState,
  useCallback,
  useImperativeHandle,
  useRef,
  RefObject,
} from 'react'

// STYLE
import './style.css'

// TYPE
interface IInpurSearch extends InputHTMLAttributes<HTMLInputElement> {
  handleSearch: (key: KeyboardEvent<HTMLInputElement>) => void
}

export interface InputHandles {
  handleToggleVisible: () => void
  input: RefObject<HTMLInputElement> | null
}

export const InputSearch = forwardRef<InputHandles, IInpurSearch>(
  ({ handleSearch, ...rest }, ref) => {
    const [visible, setVisible] = useState(false)
    const input = useRef<HTMLInputElement>(null)

    const handleToggleVisible = useCallback(() => {
      setVisible((prevState) => !prevState)
    }, [])

    useImperativeHandle(ref, () => {
      return {
        handleToggleVisible,
        input: input,
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
          ref={input}
          {...rest}
        />
      </div>
    )
  }
)
