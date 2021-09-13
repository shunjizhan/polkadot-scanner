import React from 'react';
import { Line } from 'rc-progress';
import RingLoader from 'react-spinners/RingLoader';

const Progress = ({ cur, all }) => {
  if (cur < 0) return null;

  return (
    <div id='progress'>
      <div id='progress-count'>
        <RingLoader
          loading={ cur < all }
          size={ 20 }
        />

        <div style={{ marginLeft: '20px'}}>
          {`${cur} / ${all}`}
        </div>
      </div>
      <Line
        percent={ (100 * cur) / all }
        strokeWidth='2'
        strokeColor={ cur === all ? 'green' : 'orange' }
      />
    </div>
  );
};

export default Progress;
