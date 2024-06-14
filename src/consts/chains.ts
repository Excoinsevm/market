import { defineChain } from "thirdweb";

// Define any custom chain using `defineChain`
export const bitrock = defineChain({
  chainId: 7171,
  chainName: "Bitrock",
  
  nativeCurrency: {
    name: "Bitrock",
    symbol: "BROCK",
    decimals: 18,
  },
});
