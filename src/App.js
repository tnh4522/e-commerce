import React from 'react';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';

function App(props) {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;