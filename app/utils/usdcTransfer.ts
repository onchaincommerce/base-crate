import { ethers } from 'ethers';

// Base Mainnet USDC contract address
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

const USDC_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address account) view returns (uint256)'
];

export async function transferUSDC(recipientAddress: string, amount: number) {
  console.log('Starting USDC transfer:', {
    to: recipientAddress,
    amount: amount,
    contractAddress: USDC_ADDRESS
  });

  try {
    const provider = new ethers.JsonRpcProvider(process.env.BASE_MAINNET_RPC);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, wallet);

    // Check USDC balance before transfer
    const decimals = await usdc.decimals();
    const balance = await usdc.balanceOf(wallet.address);
    const balanceFormatted = ethers.formatUnits(balance, decimals);
    
    console.log('Wallet balance:', {
      address: wallet.address,
      usdcBalance: balanceFormatted
    });

    // Convert amount to USDC units (6 decimals)
    const amountInSmallestUnit = ethers.parseUnits(amount.toString(), decimals);
    
    if (balance < amountInSmallestUnit) {
      throw new Error(`Insufficient USDC balance. Have: ${balanceFormatted}, Need: ${amount}`);
    }

    // Send the transaction
    const tx = await usdc.transfer(recipientAddress, amountInSmallestUnit);
    console.log('Transaction sent:', tx.hash);

    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.hash);

    return receipt;
  } catch (error) {
    console.error('USDC transfer failed:', error);
    throw error;
  }
} 