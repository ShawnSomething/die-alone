import React from 'react';
import { Title } from './title';
import { Main } from './main';
import { Template } from './templates';
import { Output } from './output';


function App() {
  return (
    <>
      <div className="bg-yellow-200 w-screen h-screen">
        <div>
          <Title />
        </div>
        <div>
          <Template />
          <Main />
          <Output />
        </div>
      </div>
    </>
  )
}

export default App;
