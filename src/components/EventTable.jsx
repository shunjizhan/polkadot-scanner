import React from 'react';
import {
  Table,
  Tag,
} from 'antd';

const TAG_COLORS = {
  system: 'orange',
  balances: 'green',
  treasury: 'blue',
};

const SECTIONS_FILTERS = [
  {
    text: 'timestamp',
    value: 'timestamp',
  },
  {
    text: 'balances',
    value: 'balances',
  },
  {
    text: 'staking',
    value: 'staking',
  },
  {
    text: 'utility',
    value: 'utility',
  },
  {
    text: 'proxy',
    value: 'proxy',
  },
  {
    text: 'identity',
    value: 'identity',
  },
  {
    text: 'democracy',
    value: 'democracy',
  },
  {
    text: 'imOnline',
    value: 'imOnline',
  },
  {
    text: 'multisig',
    value: 'multisig',
  },
];

const METHOD_FILTERS = [
  {
    text: 'set',
    value: 'set',
  },
  {
    text: 'transfer',
    value: 'transfer',
  },
  {
    text: 'transferKeepAlive',
    value: 'transferKeepAlive',
  },
  {
    text: 'unbond',
    value: 'unbond',
  },
  {
    text: 'batch',
    value: 'batch',
  },
  {
    text: 'nominate',
    value: 'nominate',
  },
  {
    text: 'withdrawUnbonded',
    value: 'withdrawUnbonded',
  },
  {
    text: 'bondExtra',
    value: 'bondExtra',
  },
  {
    text: 'setPayee',
    value: 'setPayee',
  },
  {
    text: 'chill',
    value: 'chill',
  },
  {
    text: 'bond',
    value: 'bond',
  },
  {
    text: 'removeAnnouncement',
    value: 'removeAnnouncement',
  },
  {
    text: 'batchAll',
    value: 'batchAll',
  },
  {
    text: 'payoutStakers',
    value: 'payoutStakers',
  },
  {
    text: 'rebond',
    value: 'rebond',
  },
  {
    text: 'setIdentity',
    value: 'setIdentity',
  },
  {
    text: 'setController',
    value: 'setController',
  },
  {
    text: 'vote',
    value: 'vote',
  },
  {
    text: 'heartbeat',
    value: 'heartbeat',
  },
  {
    text: 'approveAsMulti',
    value: 'approveAsMulti',
  },
  {
    text: 'asMulti',
    value: 'asMulti',
  },
];

const EVENTS_FILTER = [
  {
    text: 'system',
    value: 'system',
  },
  {
    text: 'balances',
    value: 'balances',
  },
  {
    text: 'treasury',
    value: 'treasury',
  },
  {
    text: 'utility',
    value: 'utility',
  },
  {
    text: 'staking',
    value: 'staking',
  },
  {
    text: 'identity',
    value: 'identity',
  },
  {
    text: 'imOnline',
    value: 'imOnline',
  },
  {
    text: 'multisig',
    value: 'multisig',
  },
  {
    text: 'electionProviderMultiPhase',
    value: 'electionProviderMultiPhase',
  },
  {
    text: 'democracy',
    value: 'democracy',
  },
  {
    text: 'council',
    value: 'council',
  },
  {
    text: 'proxy',
    value: 'proxy',
  },
];

const getTagColor = event => {
  const prefix = event.split('.')[0];
  return TAG_COLORS[prefix];
};

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
