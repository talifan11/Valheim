import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Layout } from './components/Layout';
import { HUD } from './components/HUD';
import { HomePage } from './pages/HomePage';
import { ServersPage } from './pages/ServersPage';
import { TingPage } from './pages/TingPage';

// Lazy load тяжёлых страниц
const WikiPage = lazy(() => import('./pages/WikiPage').then(module => ({ default: module.WikiPage })));
const SkillTreePage = lazy(() => import('./pages/SkillTreePage').then(module => ({ default: module.SkillTreePage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(module => ({ default: module.CommunityPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(module => ({ default: module.ShopPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(module => ({ default: module.CategoryPage })));
const ThreadPage = lazy(() => import('./pages/ThreadPage').then(module => ({ default: module.ThreadPage })));
const TagPage = lazy(() => import('./pages/TagPage').then(module => ({ default: module.TagPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(module => ({ default: module.GalleryPage })));
const NewThreadPage = lazy(() => import('./pages/NewThreadPage').then(module => ({ default: module.NewThreadPage })));
const LandingPage = lazy(() => import('./pages/Landing/LandingPage').then(module => ({ default: module.LandingPage })));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <HashRouter>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/servers" element={<ServersPage />} />
                <Route path="/wiki" element={<WikiPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/skill-tree" element={<SkillTreePage />} />
                {/* Форум Тинг */}
                <Route path="/ting" element={<TingPage />} />
                <Route path="/ting/new" element={<NewThreadPage />} />
                <Route path="/ting/tag/:tagName" element={<TagPage />} />
                <Route path="/ting/:categorySlug" element={<CategoryPage />} />
                <Route path="/ting/:categorySlug/:threadId" element={<ThreadPage />} />
                
                {/* Галерея */}
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
          <HUD />
        </HashRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
