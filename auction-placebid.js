import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from "@cosmjs/stargate";

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

// const mnemonic = 'core wear goose congress elephant afraid amazing diet holiday crush better expect provide envelope involve slide hotel prepare dad zoo fatal media cute already';
const mnemonic = 'path index calm physical toy when sell annual pill elite creek pave';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const marketContractAddress = 'archway1cwx58k4xew5zrc4zqs888w58fhckvn09ryh02qx03dv83g8d6fyq6kcl3s';
const contractAddress = 'archway1xlu0usjnk99kczu9f7kahdj05j4aq9q6glevvm8uwm8e3nr6z99snxqlh8'; // collection address

let bid_amount = {
    amount: "122",
    denom: "aconst"
};

const gasPrice = GasPrice.fromString("1000000000000aconst");
const { transactionHash } = await client.execute(
  accounts[0].address,
  marketContractAddress,
  {
    "send_tokens": {
        "msg": {
            "bid": {
                "key": "1692120583000"
            }
        }
    }
  },
  calculateFee(1000000, gasPrice),
  "",
    [bid_amount]
);

// const bidAuctionMsg = `{"bid":{"key":"1691436711000"}}`;
// console.log(bidAuctionMsg);
// contract: marketContractAddress,
// amount: "10000",
// msg: Buffer.from(bidAuctionMsg).toString("base64")

console.log(transactionHash);