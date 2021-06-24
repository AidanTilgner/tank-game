//modules
import React from 'react';

//components
import UI from './Components/UI/UI'
import Player from './Components/Player/Player'
import Bullet from './Components/Bullet/Bullet'

//files
import './App.scss';

function App() {

  (function preventScroll(){
    let body = document.querySelector('body')
    // document.querySelector('body').addEventListener('scroll', (e) => {
    //   window.scrollTo(0, 0)
    // })
  }())

  return (
    <div 
      className="App"
    >
      <UI/>
      <Player
        level={1}
        tankForm='basic'
        tankTree={'basic'}
      />
    </div>
  );
}

export default App;
