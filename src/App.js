import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import React from 'react';
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
