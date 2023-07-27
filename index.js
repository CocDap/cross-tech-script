const Web3  = require('web3');
//const json  = require("./abis/NftAbi.js");
const fs = require("fs");
//const NFTAbi  = require("./abis/nft.json");
// const SoulBoundAbi = require("./abis/soulbound.json");
require('dotenv').config();
const web3 = new Web3("https://rpc.testnet.fantom.network/");
//let NFTAbi = fs.readFileSync("./abis/nft.json", "utf8");
//const NFTAbiJson = JSON.parse(NFTAbi);
const contractNFTJson = fs.readFileSync('./abis/nft.json');
const NFTAbi = JSON.parse(contractNFTJson);


const contractSoulJson = fs.readFileSync('./abis/soulbound.json');
const SoulAbi = JSON.parse(contractSoulJson);

const main = async () => {
    
    
    // const reciept = await mint();
    //const reciept = await mintSoul();
    const reciept = await bondSoul();
    console.log("Reciept:",reciept);
    


}


const createNFTContract = () => {
    
    const contract = new web3.eth.Contract(
        NFTAbi,
        process.env.CONTRACT_NFT
    );

    return contract;
};

const createSoulBoundContract = () => {
    
    const contract = new web3.eth.Contract(
        SoulAbi,
        process.env.CONTRACT_SOUL
    );

    return contract;
};
const mint = async () => {
    const NFTContract = createNFTContract();

    const encodedTransaction = await NFTContract.methods
        .mint(
            process.env.ACCOUNT_OWNER,
            10 // token_id of nft
        )
        .encodeABI();

    const gas = 480000;
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
        data: encodedTransaction,
        to: process.env.CONTRACT_NFT
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


const mintSoul = async () => {
    const SoulContract = createSoulBoundContract();
    const encodedTransaction = await SoulContract.methods
        .mint(
            10// token id of nft
        )
        .encodeABI();

    const gas = 480000;
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
        data: encodedTransaction,
        to: process.env.CONTRACT_SOUL
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


const bondSoul = async () => {
    const SoulContract = createSoulBoundContract();
    const encodedTransaction = await SoulContract.methods
        .bond(
            1, // soul id // auto từ 1
            "0x783FC27915754512E72b5811599504eCa458E4C5"// parameter từ frontend
        )
        .encodeABI();

    const gas = 480000;
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
        data: encodedTransaction,
        to: process.env.CONTRACT_SOUL
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

main()