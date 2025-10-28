import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import Loading from './components/Loading/Loading'

function App() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      {loading && <Loading />}
     <AppRoutes/>
    </>
  )
}

export default App
