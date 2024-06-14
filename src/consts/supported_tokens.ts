import type { Chain } from "thirdweb";
import { bitrock } from "./chains";

// Define a type for representing an ERC20 token
export type Token = {
  tokenAddress: string;  // The address of the token contract
  symbol: string;       // The symbol of the token (e.g., "USDC")
  icon: string;         // A URL to the icon image of the token
};

// Define a type for representing supported tokens on a specific chain
export type SupportedTokens = {
  chain: Chain;    // The blockchain network (e.g., Ethereum, Polygon)
  tokens: Token[]; // An array of tokens supported on this chain
};

// Define a type for native token data including both the icon and symbol
export type NativeTokenData = {
  symbol: string; // The symbol of the native token (e.g., "ETH", "MATIC")
  icon: string;   // A URL to the icon image of the native token
};

/**
 * Configuration for supported tokens on different chains.
 * 
 * By default, listings are created with the native token of the network (e.g., ETH, AVAX, MATIC).
 * To allow users to transact with different ERC20 tokens, add them to this configuration.
 * 
 * Note: This configuration is for front-end usage. Ensure your marketplace v3 contracts accept these ERC20 tokens.
 * You can verify this at https://thirdweb.com/<chain-id>/<marketplace-v3-address>/permissions -> Asset
 * By default, the Marketplace V3 contract supports any asset (token).
 */
export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: bitrock,
    tokens: [
      {
        tokenAddress: "#",  // Placeholder address for the token
        symbol: "POPCAT Soon",  // The symbol of the token
        icon: "https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fassets.geckoterminal.com%2Fqfziuwt7lwhpzrasswkk9u4vp1s0&w=32&q=75",  // URL to the token's icon image
      },
      // Additional ERC20 tokens can be added here
    ],
  },
];

// Map of chain IDs to native token data including icon and symbol
export const NATIVE_TOKEN_ICON_MAP: { [key in Chain["id"]]: NativeTokenData } = {
  7171: {
    symbol: "BROCK",  // Symbol of the native token for chain ID 7171
    icon: "https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fassets.geckoterminal.com%2Fli5zejj3rste71usjxzuwzdtitu4&w=32&q=75",  // Icon URL for the native token of chain ID 7171
  },
};
