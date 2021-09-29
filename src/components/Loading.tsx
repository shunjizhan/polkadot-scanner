import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

interface LoadingProps {
  rpc: string,
  isLoading: boolean,
}

const Loading: React.FC<LoadingProps> = ({ rpc, isLoading }) => (
  <div id='loading-overlay'>
    { isLoading && (
      <div id='loading-overlay__text'>
        connecting to
        <span id='loadingText'>{ rpc }</span>
      </div>
    )}

    <PacmanLoader
      color='orange'
      loading={ isLoading }
      size={ 130 }
    />
  </div>
);

export default Loading;
