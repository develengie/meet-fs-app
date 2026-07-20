import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './style.scss'

const Loader = () => {
  return (
    <Spin
      fullscreen
      indicator={<LoadingOutlined className="loader" spin />}
      size="large"
    />
  )
}

export default Loader
