import React, {
  useState,
} from 'react';

import { ApiPromise, WsProvider } from '@polkadot/api';

import '../../styles.scss';

const InputField = ({ value, onChange }) => (
  <input
    className='input-container__field'
    value={ value }
    onChange={ onChange }
  />
);

const Scanner = () => {
  const [startBlock, setStartBlock] = useState(1);
  const [endBlock, setEndBlock] = useState(100);
  const [rpc, setRpc] = useState('wss://rpc.polkadot.io');

  const handleStartBlockChange = e => setStartBlock(e.target.value);
  const handleEndBlockChange = e => setEndBlock(e.target.value);
  const handleRpcChange = e => setRpc(e.target.value);

  const fetchData = async () => {
    console.log(`connecting using ${rpc}...`);
    const wsProvider = new WsProvider(rpc);
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log('connected!!');

    console.log(api.genesisHash.toHex());
  }

  return (
    <div id='Scanner'>
      <section id='input-container'>
        <InputField
          value={ startBlock }
          onChange={ handleStartBlockChange }
        />
        <InputField
          value={ endBlock }
          onChange={ handleEndBlockChange }
        />
        <InputField
          value={ rpc }
          onChange={ handleRpcChange }
        />
        <button
          id='input-container__button'
          type='button'
          onClick={ fetchData }
        >
          fetch data
        </button>
      </section>
    </div>
  );
};

Scanner.propTypes = {};

export default Scanner;
