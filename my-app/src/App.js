import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Section from './components/section';
import Bansection from './components/bansection';
import B from './components/b';
import Layout from './components/layout';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Header />
                <main>
                  <Section />
                  <img
                    src={process.env.PUBLIC_URL + '/kon.png'}
                    alt="Kon"
                    className="home"
                  />
                  <Bansection />
                </main>
              </Layout>
            }
          />
          <Route path="b" element={<B />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      
    </div>
  );
}

export default App;
