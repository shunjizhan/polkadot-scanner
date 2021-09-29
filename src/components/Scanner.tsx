import React, {
  useState,
  useRef,
} from 'react';

import EventTable from './EventTable';
import Progress from './Progress';
import Inputs from './Inputs';
import Loading from './Loading';

import {
  createRpc,
  getEventsForBlock,
  getLastBlock,
} from '../utils/utils';

import '../styles.scss';
import 'antd/dist/antd.css';

const DEFAULT_RPC = 'wss://rpc.polkadot.io';
const NO_ERR = { rpc: null, start: null, end: null };

const Scanner = () => {
  const [startBlock, setStartBlock] = useState(6763000);
  const [endBlock, setEndBlock] = useState(6763100);
  const [rpc, setRpc] = useState(DEFAULT_RPC);
  const [isSwitchingRpc, setIsSwitchingRpc] = useState(false);
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(-1);
  const [switchingRPC, setSwitchingRPC] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(NO_ERR);
  const curApi = useRef();

  const totalBlocks = endBlock - startBlock + 1;

  useState(() => {
    (async () => {
      const api = await createRpc(rpc);
      curApi.current = { api, rpc };
      setSwitchingRPC(false);
    })();
  }, []);

  const getInputHandler = fn => e => {
    fn(e.target.value);
    setCount(-1);
  };
  const handleStartBlockChange = getInputHandler(setStartBlock);
  const handleEndBlockChange = getInputHandler(setEndBlock);
  const handleRpcChange = getInputHandler(setRpc);

  const updateApi = async () => {
    if (rpc === curApi.current.rpc) return;

    setIsSwitchingRpc(true);
    try {
      const api = await createRpc(rpc);
      curApi.current = { api, rpc };
      setErr({
        ...err,
        rpc: null,
      });
    } catch (e) {
      setErr({
        ...err,
        rpc: `failed to connect to new RPC... fell back to ${curApi.current.rpc}`,
      });
    } finally {
      setIsSwitchingRpc(false);
    }
  };

  const validateFields = async () => {
    if (startBlock < 0) { setErr({ ...err, start: 'start block must be greater than 0!' }); return false; }
    if (startBlock >= endBlock) { setErr({ ...err, start: 'start block must be greater than end block!' }); return false; }
    if (endBlock < 0) { setErr({ ...err, end: 'end block must be greater than 0!' }); return false; }
    if (endBlock - startBlock > 2000) { setErr({ ...err, end: 'max interval is 2000!' }); return false; }

    const lastBlock = await getLastBlock(curApi.current.api);
    if (endBlock > lastBlock) { setErr({ ...err, end: `end block must be less than last block ${lastBlock}!` }); return false; }

    return true;
  };

  const BATCH_SIZE = 10;
  let dataBuffer = [];
  const flushData = () => {
    setEvents(e => dataBuffer.reduce((acc, cur) => acc.concat(cur), e));
    setCount(c => c + dataBuffer.length);
    dataBuffer = [];
  };

  const fetchData = async () => {
    const isFieldsValid = await validateFields();
    if (!isFieldsValid) return;
    setErr(NO_ERR);

    setEvents([]);
    setCount(0);
    setIsLoading(true);

    await updateApi();

    const _fetch = async block => {
      const data = await getEventsForBlock(curApi.current.api, block);
      dataBuffer.push(data);

      if (dataBuffer.length === BATCH_SIZE) {
        flushData();
      }

      if (block === parseInt(endBlock)) {
        flushData();
        setIsLoading(false);
      }
    };

    for (let block = startBlock; block <= endBlock; block++) {
      _fetch(block);
    }
  };

  return (
    <div id='Scanner'>
      <Loading rpc={ rpc } isLoading={ switchingRPC } />

      { !switchingRPC && (
        <>
          <Inputs
            rpc={ rpc }
            startBlock={ startBlock }
            endBlock={ endBlock }
            isSwitchingRpc={ isSwitchingRpc }
            isLoading={ isLoading }
            fetchData={ fetchData }
            handleRpcChange={ handleRpcChange }
            handleStartBlockChange={ handleStartBlockChange }
            handleEndBlockChange={ handleEndBlockChange }
            err={ err }
            setErr={ setErr }
          />

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
