import {ethers} from "ethers";
import * as dotenv from 'dotenv'
dotenv.config();
import abi from "./abi.json" assert {type:"json"};
const pro = new ethers.providers.JsonRpcProvider(process.env.ARBI_API); 

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, pro);

// CLaim all ARBI 
const TOKEN_DISTRIBUTOR='0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9';
const ARB_TOKEN= '0x912CE59144191C1204E64559FE8253a0e49E6548';
const contract  = new ethers.Contract(TOKEN_DISTRIBUTOR, abi, signer);
const arbTokenAbi = ["function balanceOf(address owner) view returns (uint256)"];
const arbtokencontract = new ethers.Contract(ARB_TOKEN,arbTokenAbi,signer);

const claim = async() =>{

// Get claimable amount 
console.log('contract',contract);
const claimable_tokens = await contract.claimableTokens(signer.address);
console.log("claim",claimable_tokens.toString());

// Claim all ARBI

const tx = await contract.claim({gasLimit: 3000000});

const receipt = await tx.wait();
console.log("receipt",receipt);
console.log("CLAIMED!!");

// Check balance
const balance = await arbtokencontract.balanceOf(signer.address);
console.log("Your arbitrum balance is ",balance.toString());
}
claim();

