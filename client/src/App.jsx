import { BrowserRouter } from 'react-router'
import { AppRouter } from '@/components'

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App