const SHA226 = require("crypto.js/sha226");
// Juan Fung Chai 18/09/2021
class Block{ // Making the block
    constructor(index, timestamp, data, previousHash = ' ') { // constructor to store the index, time, data and the hash for the previous block
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0; // random number
    }

    calculateHash(){ // use to calculate the hash
        return SHA226(this.index + this.previousHash + this.timestamp + JSON.stringify((this.data) + this.nonce).toString())
    }

    mineBlock(difficulty){ // make the hash of block start with a certain amount of 0s to avoid tampering
        while(this.hash.substring(0, difficulty) !== array(difficulty + 1).join("0")){
            this.nonce++; // as long as hash doesnt start with enough 0s + 1
            this.hash = this.calculateHash();
        }
        console.log("Block mined " + this.hash);
    }
}

class BlockChain{ // making the blockchain
    constructor() { // initialise the blockchain
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){ // the og block
        return new Block('0', "24/09/2021", "Genesis Block", "0")

    }

    getLatestBlock(){ // returns the previous block
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){ // adds another block
        newBlock.previousHash = this.getLatestBlock().hash; // sets the previous hash as the latest block
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock); // pushes the block to the end of the chain
    }

    isChainValid(){ // test if chain is valid
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1]

            if(currentBlock.hash !== currentBlock.calculateHash()){ // if the current blocks hash doesnt equal to previous block
                return false; // not valid
            }

            if(currentBlock.previousHash !== previousBlock.hash){ // if the hash of the previous block doesn't match
                return false; // not valid
            }
        }
        return true // chain works perfectly
    }
}

let MediCoin = new BlockChain(); // makes the medicoin chain
MediCoin.addBlock(new Block("1", "25/09/2021", {amount : 4}))// adds new blocks
MediCoin.addBlock(new Block("2", "28/09/2021", {amount : 10}))

console.log(JSON.stringify(MediCoin, null, 4)) // show the coins
// console.log("is block chain valid?" + MediCoin.isChainValid()) // validate coins
// console.log("Mining Block 1..") // checking the blocks
// console.log("Mining Block 1..")