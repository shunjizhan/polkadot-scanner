import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Loading = ({ rpc, isLoading }) => (
  <div id='loading-overlay'>
    { isLoading && (
      <div id='loading-overlay__text'>
        connecting to
        <span id='loadingText'>{ rpc }</span>
      </div>
    )}

    <PacmanLoader
      color={ 'orange' }
      loading={ isLoading }
      size={ 150 }
    />
  </div>
);

export default Loading;
