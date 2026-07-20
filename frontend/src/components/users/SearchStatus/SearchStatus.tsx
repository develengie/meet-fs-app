import { Tag } from 'antd'
import './style.scss'

interface SearchStatusProps {
  length: number
}

const SearchStatus = ({ length }: SearchStatusProps) => {
  const renderPhrase = (usersCount: number) => {
    const lastOne = Number(usersCount.toString().slice(-1))

    if (usersCount > 4 && usersCount < 15) return 'человек тусанет'
    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
    if (lastOne === 1) return 'человек тусанет'

    return 'человек тусанет'
  }

  return (
    <Tag className="tag" color={length > 0 ? 'blue' : 'red'}>
      {length > 0
        ? `${length} ${renderPhrase(length)} с тобой!`
        : 'Никто не тусанет с тобой!'}
    </Tag>
  )
}

export default SearchStatus
