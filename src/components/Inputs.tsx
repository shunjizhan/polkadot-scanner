import React, { FC } from 'react';
import { Input, Button, Form } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import { Err, eventHandler } from './Scanner';

const SUCCESS = 'success';
const ERROR = 'error';

interface InputsProps {
  rpc: string,
  startBlock: number,
  endBlock: number,
  err: Err,

  isSwitchingRpc: boolean,
  isLoading: boolean,

  fetchData: () => void,
  handleRpcChange: eventHandler,
  handleStartBlockChange: eventHandler,
  handleEndBlockChange: eventHandler,

}

const Inputs: FC<InputsProps> = ({
  rpc,
  startBlock,
  endBlock,
  err,

  isSwitchingRpc,
  isLoading,

  fetchData,
  handleRpcChange,
  handleStartBlockChange,
  handleEndBlockChange,
}) => (
  <section id='input-container'>
    <Form>
      <Form.Item
        validateStatus={ err.rpc ? ERROR : SUCCESS }
        help={ err.rpc }
      >
        <Input
          addonBefore={ (
            <div style={{ width: '100px' }}>
              {isSwitchingRpc ? <SyncOutlined spin /> : 'RPC'}
            </div>
          ) }
          className='input-container__field'
          value={ rpc }
          onChange={ handleRpcChange }
          disabled={ isLoading }
        />
      </Form.Item>

      <Form.Item
        validateStatus={ err.start ? ERROR : SUCCESS }
        help={ err.start }
      >
        <Input
          addonBefore={ (
            <div style={{ width: '100px' }}>
              Start Block
            </div>
          ) }
          className='input-container__field'
          value={ startBlock }
          onChange={ handleStartBlockChange }
          disabled={ isLoading }
        />
      </Form.Item>

      <Form.Item
        validateStatus={ err.end ? ERROR : SUCCESS }
        help={ err.end }
      >
        <Input
          addonBefore={ (
            <div style={{ width: '100px' }}>
              End Block
            </div>
          ) }
          className='input-container__field'
          value={ endBlock }
          onChange={ handleEndBlockChange }
          disabled={ isLoading }
        />
      </Form.Item>
    </Form>

    <Button
      type='primary'
      id='input-container__button'
      onClick={ fetchData }
      loading={ isLoading }
      disabled={ isLoading }
    >
      scan
    </Button>
  </section>
);

export default Inputs;
