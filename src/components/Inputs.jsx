import React from 'react';
import { Input, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const InputField = ({
  name, value, onChange, disabled,
}) => (
  <div>
    <Input
      addonBefore={ <div style={{ width: '100px' }}>{ name }</div> }
      className='input-container__field'
      value={ value }
      onChange={ onChange }
      disabled={ disabled }
    />
  </div>
);

const Inputs = ({
  rpc,
  startBlock,
  endBlock,

  isSwitchingRpc,
  isLoading,

  fetchData,
  handleRpcChange,
  handleStartBlockChange,
  handleEndBlockChange,
}) => (
  <section id='input-container'>
    <InputField
      name={ isSwitchingRpc ? <SyncOutlined spin /> : 'RPC' }
      value={ rpc }
      onChange={ handleRpcChange }
      disabled={ isLoading }
    />
    <InputField
      name='Start Block'
      value={ startBlock }
      onChange={ handleStartBlockChange }
      disabled={ isLoading }
    />
    <InputField
      name='End Block'
      value={ endBlock }
      onChange={ handleEndBlockChange }
      disabled={ isLoading }
    />

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
