import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './components/login';
import AuthGuard from './core/guards/AuthGuard';
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes> 
          {/* Unprotected routes */}
          <Route path="/login" element={<Login />} />
          {/* Add other routes here */}
          {/* Unprotected routes */}

          {/* Protected routes */}
          <Route path='/home' element={ <AuthGuard><Home/></AuthGuard> } />
          {/* Add other routes here */}
          {/* Protected routes */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
