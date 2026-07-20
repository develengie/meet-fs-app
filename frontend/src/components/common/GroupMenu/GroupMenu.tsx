import { Menu, type MenuProps } from 'antd'
import './style.scss'

type MenuItem = NonNullable<MenuProps['items']>[number]

interface GroupMenuProps {
  items: MenuItem[]
  selectedId: string
  onItemSelect: (id: string) => void
}

const GroupMenu = (props: GroupMenuProps) => {
  const { items, selectedId, onItemSelect } = props

  return (
    <Menu
      className="menu"
      items={items}
      selectedKeys={selectedId ? [selectedId] : []}
      onClick={({ key }) => onItemSelect(key)}
    />
  )
}

export default GroupMenu
