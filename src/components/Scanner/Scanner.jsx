import React, {
  useReducer,
  useState,
  useRef,
} from 'react';

import { Table } from 'antd';

import {
  createRpc,
  getEventsForBlock,
} from '../../utils/utils';

import '../../styles.scss';
import 'antd/dist/antd.css';

const InputField = ({ name, value, onChange }) => (
  <div>
    { name }
    <input
      className='input-container__field'
      value={ value }
      onChange={ onChange }
    />
  </div>
);

const Progress = ({ cur, all }) => (
  <div>
    { `finished: ${cur}/${all}` }
  </div>
);

const EventTable = ({ dataSource }) => {
  const columns = [
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Events',
      dataIndex: 'events',
      key: 'events',
    },
  ];

  return (
    <Table
      dataSource={ dataSource }
      columns={ columns }
    />
  );
};

const Scanner = () => {
  const [startBlock, setStartBlock] = useState(6763000);
  const [endBlock, setEndBlock] = useState(6763100);
  const [rpc, setRpc] = useState('wss://rpc.polkadot.io');
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(-1);
  const [isInitializing, setIsInitializing] = useState(true);
  const prevApi = useRef();

  const totalBlocks = endBlock - startBlock + 1;

  useState(() => {
    (async () => {
      const api = await createRpc(rpc);
      prevApi.current = { api, rpc };
      setIsInitializing(false);
    })();
  }, []);

  const getInputHandler = fn => e => {
    fn(e.target.value);
    setCount(-1);
  };
  const handleStartBlockChange = getInputHandler(setStartBlock);
  const handleEndBlockChange = getInputHandler(setEndBlock);
  const handleRpcChange = getInputHandler(setRpc);

  const getApi = async () => {
    if (rpc === prevApi.current.rpc) {
      return prevApi.current.api;
    }

    const api = await createRpc(rpc);
    prevApi.current = { api, rpc };

    return api;
  };

  const fetchData = async () => {
    setEvents([]);
    setCount(0);
    const api = await getApi();

    const _fetch = async block => {
      console.log(`fethcing ${block}`);
      const data = await getEventsForBlock(api, block);
      setEvents(e => [...e, ...data]);
      setCount(c => c + 1);

      console.log('data:', data);
      return data;
    };

    const pendings = [];
    for (let block = startBlock; block <= endBlock; block++) {
      pendings.push(_fetch(block));
    }

    await Promise.all(pendings);
  };

  return (
    <div id='Scanner'>
      {isInitializing && <span style={{ fontSize: '200%' }}>connecting to { rpc } ...</span> }

      { !isInitializing && (
        <div>
          <section id='input-container'>
            <InputField
              name='startBlock'
              value={ startBlock }
              onChange={ handleStartBlockChange }
            />
            <InputField
              name='endBlock'
              value={ endBlock }
              onChange={ handleEndBlockChange }
            />
            <InputField
              name='RPC'
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
          <br />
          { count > -1
            && (
              <Progress
                cur={ count }
                all={ totalBlocks }
              />
            )}

          { !!events.length && <EventTable dataSource={ events } /> }
        </div>
      )}
    </div>
  );
};

Scanner.propTypes = {};

export default Scanner;
