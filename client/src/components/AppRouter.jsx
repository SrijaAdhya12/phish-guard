import { Route, Routes, useLocation } from 'react-router'
import { Home, Scan } from '@/pages'

const AppRouter = () => {
    const location = useLocation()
    return (
        <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
        </Routes>
    )
}

export default AppRouter