import { Skeleton } from 'antd'

interface SkeletonBlockProps {
  width: string
  height: string
}

const SkeletonBlock = ({ width, height }: SkeletonBlockProps) => {
  return (
    <Skeleton.Node
      active
      style={{
        width,
        height
      }}
    />
  )
}

export default SkeletonBlock
