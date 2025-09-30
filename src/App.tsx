import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const getCurrentPage = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/search') return 'search';
    if (location.pathname.startsWith('/profile')) return 'profile';
    return 'home';
  };

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      navigate('/');
    } else if (page === 'search') {
      navigate('/search');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        currentPage={getCurrentPage()} 
        onNavigate={handleNavigate} 
      />
      
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;