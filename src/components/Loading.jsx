import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const color = 'orange';
const Loading = ({ rpc, isLoading }) => (
  <div id='loading-overlay'>
    { isLoading && (
      <div id='loading-overlay__text'>
        connecting to
        <span style={{ color, paddingLeft: '10px' }}>{ rpc }</span>
      </div>
    )}

    <PacmanLoader
      color='orange'
      loading={ isLoading }
      size={ 150 }
    />
  </div>
);

export default Loading;
