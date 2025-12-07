import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}