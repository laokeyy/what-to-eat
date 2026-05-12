import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { PickPage } from './views/PickPage'
import { RecipesPage } from './views/RecipesPage'
import { RulesPage } from './views/RulesPage'
import { ProfilePage } from './views/ProfilePage'
import { DiscoverPage } from './views/DiscoverPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/pick" replace />} />
          <Route path="/pick" element={<PickPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App