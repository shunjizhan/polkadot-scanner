import React from 'react';
import {
  Table,
  Tag,
} from 'antd';

import {
  SECTIONS_FILTERS,
  METHOD_FILTERS,
  EVENTS_FILTER,
  getTagColor,
} from '../utils/tableUtils';

const renderEvents = events => (
  <>
    {
      events.map((e, i) => (
        // eslint-disable-next-line
        <Tag color={ getTagColor(e) } key={ i }>
          {e}
        </Tag>
      ))
    }
  </>
);

const renderBlock = block => (<a href={ `https://polkadot.subscan.io/block/${block}` }>{ block }</a>);

const getStringSorter = key => (a, b) => a[key].localeCompare(b[key]);
const getStringFilter = key => (value, record) => record[key] === value;

const EventTable = ({ dataSource }) => {
  const columns = [
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
      render: renderBlock,
      sorter: (a, b) => (a - b > 0 ? 1 : -1),
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      sorter: getStringSorter('section'),
      filters: SECTIONS_FILTERS,
      onFilter: getStringFilter('section'),
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      sorter: getStringSorter('method'),
      filters: METHOD_FILTERS,
      onFilter: getStringFilter('method'),
    },
    {
      title: 'Events',
      dataIndex: 'events',
      key: 'events',
      render: renderEvents,
      filters: EVENTS_FILTER,
      onFilter: (value, record) => record.events.some(e => e.split('.')[0] === value),
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
