import { defineChain } from "thirdweb";

// Define any custom chain using `defineChain`
export const bitrock = defineChain({
  chainId: 7171,
  name: "Bitrock",
  rpc: ["https://connect.bit-rock.io"], // Replace with actual RPC URL
  nativeCurrency: {
    name: "Bitrock",
    symbol: "BROCK",
    decimals: 18,
  },
  blockExplorers: [{ name: "Bitrock Explorer", url: "https://explorer.bit-rock.io" }], // Replace with actual explorer URL
  testnet: false,
  slug: "bitrock",
  shortName: "brock"
});
