import React from 'react';
import {
  Table,
} from 'antd';

const EventTable = ({ dataSource }) => {
  const columns = [
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
    },
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
      id='data-table'
      dataSource={ dataSource }
      columns={ columns }
    />
  );
};

export default EventTable;
