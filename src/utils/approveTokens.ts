import Web3 from "web3";
import { SUPPORTED_TOKENS } from "../consts/supported_tokens";

interface TransactionParams {
  chainId: number;
  tokenAddress: string;
  spender: string;
  amount: bigint;
  transactionCallback: () => Promise<any>;
}

// Corrected ABI for web3.js
const TOKEN_ABI: any[] = [
  {
    "constant": true,
    "inputs": [
      { "name": "owner", "type": "address" },
      { "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [
      { "name": "", "type": "uint256" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [
      { "name": "", "type": "bool" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const executeTransactionWithApproval = async ({
  chainId,
  tokenAddress,
  spender,
  amount,
  transactionCallback,
}: TransactionParams) => {
  if (!window.ethereum) {
    throw new Error("Ethereum provider not found");
  }

  const web3 = new Web3(window.ethereum as any);

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);

  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];

  const allowance = await tokenContract.methods.allowance(userAddress, spender).call();

  const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

  if (web3.utils.toBN(allowance).lt(web3.utils.toBN(amountInWei))) {
    const approvalTx = await tokenContract.methods.approve(spender, amountInWei).send({ from: userAddress });
    console.log(`Successfully approved ${amount} tokens for spender ${spender}`);
  }

  return transactionCallback();
};

function getTokenByAddress(chainId: number, tokenAddress: string) {
  const supportedChain = SUPPORTED_TOKENS.find((supported) => supported.chain.id === chainId);
  if (!supportedChain) {
    console.error(`No supported tokens found for chainId ${chainId}`);
    return null;
  }

  return supportedChain.tokens.find((token) => token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()) || null;
}
