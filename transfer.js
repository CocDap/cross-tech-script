const Web3  = require('web3');
const web3 = new Web3("https://rpc.testnet.fantom.network/");
require('dotenv').config();

const main = async () => {
    
    const reciept = await transfer();
    console.log("Reciept:",reciept);
    


}

const transfer = async () => {


    const gas = 21000;
    const gasPrice = web3.utils.toHex(await getGasPrice());
    const nonce = web3.utils.toHex(await getNonce());
    const { address, privateKey } = web3.eth.accounts.privateKeyToAccount(
        process.env.PRIVATE_KEY
    );

    let txParams = {
        from: web3.utils.toChecksumAddress(address),
        gas,
        gasPrice,
        nonce,
        value:web3.utils.toHex("100000000000000000"),
        to: '0x783FC27915754512E72b5811599504eCa458E4C5'
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
        txParams,
        privateKey
    );

    

    const receipt = await web3.eth.sendSignedTransaction(
        signedTransaction.raw || signedTransaction.rawTransaction
    );
    return receipt;


}


const getGasPrice = async () => {
    return await web3.eth.getGasPrice();
};

const getNonce = async () => {
    const { address: dev_address } = web3.eth.accounts.privateKeyToAccount(
        process.env.PRIVATE_KEY
    );


    return await web3.eth.getTransactionCount(
        web3.utils.toChecksumAddress(dev_address)
    );
};

main();


