import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex h-[50vh] justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl mb-2">Trang không tồn tại</h1>
        <Button type="primary" onClick={onBack}>
          Quay lại
        </Button>
      </div>
    </div>
  )
}

export default Page404
