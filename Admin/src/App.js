import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Course from './components/Course';
import ListCategory from './components/ListCategory';


export default function App() {
  const [category, setCategory] = useState()


  useEffect(() => {

    getApiCaterogy()

  }, []);
  const getApiCaterogy = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/category`);
      const data = await response.json();
      if (data) {
        setCategory(data);
      }
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error);
    }
  };

  return (
    <>
      <Nav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <Routes>
            <Route path="/khoahoc" element={<Course category={category} />} />
            <Route path="/loai" element={<ListCategory getApiCaterogy={getApiCaterogy} category={category} />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}


