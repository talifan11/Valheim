import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Layout } from './components/Layout';
import { HUD } from './components/HUD';
import { HomePage } from './pages/HomePage';
import { ServersPage } from './pages/ServersPage';
import { WikiPage } from './pages/WikiPage';
import { CommunityPage } from './pages/CommunityPage';
import { ShopPage } from './pages/ShopPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servers" element={<ServersPage />} />
              <Route path="/wiki" element={<WikiPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
          <HUD />
        </HashRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
