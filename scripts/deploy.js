// replace the name of the contract with which one you want to deploy!
const hre = require("hardhat");

async function main() {

  const Whitelist = await hre.ethers.getContractFactory("Whitelist");
  const whitelist = await Whitelist.deploy(100);
  
  await whitelist.deployed();

  console.log(`Whitelist deployed to address: ${whitelist.address}`);

}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });