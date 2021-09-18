import React, {
  useState,
  useRef,
} from 'react';
import { Button } from 'antd';

import EventTable from './EventTable';
import Progress from './Progress';
import InputField from './InputField';
import Loading from './Loading';

import {
  createRpc,
  getEventsForBlock,
} from '../utils/utils';

import '../styles.scss';
import 'antd/dist/antd.css';

const defaultRpc = 'wss://rpc.polkadot.io';
const Scanner = () => {
  const [startBlock, setStartBlock] = useState(6763000);
  const [endBlock, setEndBlock] = useState(6763100);
  const [rpc, setRpc] = useState(defaultRpc);
  const [isSwitchingRpc, setIsSwitchingRpc] = useState(false);
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const prevApi = useRef();

  const totalBlocks = endBlock - startBlock + 1;

  useState(() => {
    (async () => {
      const api = await createRpc(rpc);
      prevApi.current = { api, rpc };
      setIsLoading(false);
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

    setIsSwitchingRpc(true);
    const api = await createRpc(rpc);
    prevApi.current = { api, rpc };
    setIsSwitchingRpc(false);

    return api;
  };

  const BATCH_SIZE = 10;
  let dataBuffer = [];
  const flushData = () => {
    setEvents(e => dataBuffer.reduce((acc, cur) => acc.concat(cur), e));
    setCount(c => c + dataBuffer.length);
    dataBuffer = [];
  };

  const fetchData = async () => {
    setEvents([]);
    setCount(0);
    const api = await getApi();

    const _fetch = async block => {
      const data = await getEventsForBlock(api, block);
      dataBuffer.push(data);

      if (dataBuffer.length === BATCH_SIZE || block === endBlock) {
        flushData();
      }
    };

    for (let block = startBlock; block <= endBlock; block++) {
      _fetch(block);
    }
  };

  return (
    <div id='Scanner'>
      <Loading rpc={ rpc } isLoading={ isLoading } />

      { !isLoading && (
        <>
          <section id='input-container'>
            <InputField
              name={ isSwitchingRpc ? 'switching RPC...' : 'RPC' }
              value={ rpc }
              onChange={ handleRpcChange }
            />
            <InputField
              name='Start Block'
              value={ startBlock }
              onChange={ handleStartBlockChange }
            />
            <InputField
              name='End Block'
              value={ endBlock }
              onChange={ handleEndBlockChange }
            />

            <Button
              type='primary'
              id='input-container__button'
              onClick={ fetchData }
            >
              fetch data
            </Button>
          </section>

          <div id='toolBox'>
            <Progress
              cur={ count }
              all={ totalBlocks }
            />
          </div>

          { !!events.length && (
            <div id='table-container'>
              <EventTable dataSource={ events } />
            </div>
          )}
        </>
      )}
    </div>
  );
};

Scanner.propTypes = {};

export default Scanner;
