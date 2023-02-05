import React, { useContext, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import LoadingSpinner from './components/UI/LoadingSpinner';

const ProfilePage = React.lazy(() => import('./pages/ProfiePage'));

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  return (
    <Layout>
      <Suspense fallback={
        <div className='centered'>
          <LoadingSpinner state='Loading Data' />
        </div>
      }>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {!isLoggedIn && (
            <Route path='/auth' element={<AuthPage />} />
          )}
          <Route path='/profile' element={
            <>
              {isLoggedIn && <ProfilePage />}
              {!isLoggedIn && <Navigate to='/auth' />}
            </>
          } />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;