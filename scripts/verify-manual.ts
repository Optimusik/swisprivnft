import { run } from 'hardhat';
import deployedAddress from '../utils/deployed-address';

async function main() {
  const contractAddress = deployedAddress;
  const constructorArgs = ['0x...']; // Replace with the actual constructor arguments

  console.log('Pausing 5 seconds in order to verify Contract');
  await delay();
  console.log('Pause finished. Verifying Contract...');

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: constructorArgs,
    });
    console.log("Contract verified to", `https://explorer-evm.testnet.swisstronik.com/address/${contractAddress}`);
  } catch (err) {
    console.error('Error verifying contract. Reason:', err);
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 5000));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
