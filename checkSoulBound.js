const Web3  = require('web3');


const fs = require("fs");

require('dotenv').config();
const web3 = new Web3("https://rpc.testnet.fantom.network/");

const contractSoulJson = fs.readFileSync('./abis/soulbound.json');
const SoulAbi = JSON.parse(contractSoulJson);


const main = async () => {
    
    const result = await checkSoulBoundExist('0x783FC27915754512E72b5811599504eCa458E4C5');
    console.log("Result:",result);
    


}

const checkSoulBoundExist = async (userAddress) => {
    
    const contract = new web3.eth.Contract(
        SoulAbi,
        process.env.CONTRACT_SOUL
    );

    try {
        // Call the method on the contract
        const result = await contract.methods['checkOwnerSbt'](userAddress).call({gas:480000});
        console.log(result);
      } catch (error) {
        console.error('Error while querying contract method:', error);
      }

    return false;
};


main();


