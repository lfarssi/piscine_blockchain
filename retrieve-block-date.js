

async function retrieveBlockDate(hash) {
  const header = await rpc("getblockheader", [hash]);
  return Number(header.time);
}
module.exports = { retrieveBlockDate };