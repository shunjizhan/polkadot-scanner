import { ApiPromise, WsProvider } from '@polkadot/api';

export const createRpc = async endpoint => {
  console.log(`connecting using ${endpoint}...`);

  const wsProvider = new WsProvider(endpoint);
  const api = await ApiPromise.create({ provider: wsProvider });

  console.log('connected!!');

  return api;
};

export const getSignedBlock = async (api, blockNumber) => {
  const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);

  return signedBlock;
};

export const getEventsForBlock = async (api, blockNumber) => {
  const signedBlock = await getSignedBlock(api, blockNumber);
  const allRecords = await api.query.system.events.at(signedBlock.block.header.hash);

  const res = [];
  signedBlock.block.extrinsics.forEach(({ method: { method, section } }, index) => {
    // filter the specific events based on the phase and then the index of our extrinsic in the block
    const events = allRecords
      .filter(({ phase }) => (
        phase.isApplyExtrinsic
        && phase.asApplyExtrinsic.eq(index)))
      .map(({ event }) => `${event.section}.${event.method}`);

    res.push({
      block: blockNumber,
      section,
      method,
      events: events.join(', ') || 'no events',
    });
  });

  return res;
};
