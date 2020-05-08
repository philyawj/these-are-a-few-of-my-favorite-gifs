import React from 'react';
import './App.css';
import data from './gifs.json'

function App() {
  // console.log(data);
  return (
    <div className="App">
      {data.gifs.map((block, index) =>
        <div key={index}>
          <h1>Gif Name: {block.name}</h1>
          <img alt={block.alt} src={'/assets/gifs/' + block.name + '.gif'} />
          {/* {console.log(block.tags)} */}
          <h2>
            {block.tags.map(tag => ' #' + tag)}
          </h2>


        </div>
      )}
    </div>
  );
}

export default App;
