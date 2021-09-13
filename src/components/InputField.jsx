import React from 'react';
import { Input } from 'antd';

const InputField = ({ name, value, onChange }) => (
  <div>
    <Input
      addonBefore={ <div style={{ width: '100px' }}>{ name }</div> }
      className='input-container__field'
      value={ value }
      onChange={ onChange }
    />
  </div>
);

export default InputField;
