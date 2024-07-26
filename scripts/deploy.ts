import { ethers, run } from 'hardhat';

async function main() {
  const initialOwner = '0xC169c822940B2Cf17C5962AA41e87a3Eb26e5266'; // Replace with the actual owner address

  console.log('Deploying PrivateNFT...');
  const Contract = await ethers.getContractFactory('PrivateNFT');
  const contract = await Contract.deploy(initialOwner);

  await contract.deployed();
  console.log('PrivateNFT deployed to:', contract.address);

  const contractAddress = contract.address;

  // Write the deployed address to a file (optional)
  const fs = require('fs');
  const path = require('path');
  const deployedAddressPath = path.join(__dirname, '..', 'utils', 'deployed-address.ts');
  const fileContent = `const deployedAddress = '${contractAddress}'\n\nexport default deployedAddress\n`;
  fs.writeFileSync(deployedAddressPath, fileContent, { encoding: 'utf8' });
  console.log('Address written to deployedAddress.ts');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
