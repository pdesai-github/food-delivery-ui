import React from 'react';
import logo from './logo.svg';
import './App.css';
import OrderProducer from './components/OrderProducer';
import OrderReceiver from './components/OrderReceiver';
import OrderDashboard from './components/OrderDashboard';

function App() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <OrderProducer></OrderProducer>
        </div>
        <div className='col-md-4'>
          <OrderDashboard></OrderDashboard>
        </div>
        <div className='col-md-4'>
          <OrderReceiver></OrderReceiver>
          <hr />
          <OrderReceiver></OrderReceiver>
        </div>
      </div>
    </div>
  );
}

export default App;
