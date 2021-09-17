const Web3 = require('web3');
const WETH_ABI = require('./WETH_ABI.json');
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const ETH_RINKEBY_PROVIDER = process.env.ETH_RINKEBY_PROVIDER;
const WETH_ADDRESS = process.env.WETH_ADDRESS;

const provider = new Web3.providers.HttpProvider(ETH_RINKEBY_PROVIDER);
const web3Instance = new Web3(provider);
const wethContract = new web3Instance.eth.Contract(WETH_ABI, WETH_ADDRESS);

const getTokenBalance = async () => {
  try {
    const tokenBalance = await wethContract.methods
      .balanceOf(WALLET_ADDRESS)
      .call();
    console.log(tokenBalance);
  } catch (error) {
    console.log(error);
  }
};

const getlatestBlock = async () => {
  try {
    const latestTranferEvent = await wethContract.getPastEvents('Transfer', {
      toBlock: 'latest',
    });
    const latestBlock = latestTranferEvent[0].blockNumber;
    const nearestTranferEvent = await wethContract.getPastEvents('Transfer', {
      fromBlock: latestBlock - 100,
      toBlock: latestBlock,
    });
    console.log(nearestTranferEvent.length);
  } catch (error) {
    console.log(error);
  }
};

const getTransferEvent = async () => {
  try {
    const res = await web3Instance.eth.subscribe('Transfer');
    console.log(res);
  } catch (error) {}
};

// token balance
getTokenBalance();

// last 100 block
getlatestBlock();

// subcribe to transfer event
getTransferEvent();
