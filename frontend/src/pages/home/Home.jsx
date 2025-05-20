import React from 'react'
import '@/styles/home.scss'; 
import Widget from '../../components/widget/Widget';

const Home = () => {
  return (    
      <div className="widgets">
        <Widget type="funcionarios" />
        <Widget type="dependencias" />
        <Widget type="ultimos_registros" />
        <Widget type="otros" />      
      </div>
  );
};

export default Home;