import type { Chain } from "thirdweb";
import { bitrock } from "./chains";

export type Token = {
  tokenAddress: string;
  symbol: string;
  icon: string;
};

export type SupportedTokens = {
  chain: Chain;
  tokens: Token[];
};

/**
 * By default you create listings with the payment currency in the native token of the network (eth, avax, matic etc.)
 *
 * If you want to allow users to transact using different ERC20 tokens, you can add them to the config below
 * Keep in mind this is for front-end usage. Make sure your marketplace v3 contracts accept the ERC20s
 * check that in https://thirdweb.com/<chain-id>/<marketplace-v3-address>/permissions -> Asset
 * By default the Marketplace V3 contract supports any asset (token)
 */
export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: bitrock,
    tokens: [
      {
        tokenAddress: "0xa056871e6796315c558280bff7e7f5d2c5b1f6fb",
        symbol: "CHARM",
        icon: "https://raw.githubusercontent.com/Excoinsevm/market/main/src/app/charm.png",
      },
      {
        tokenAddress: "0xdce5726e3bc8e1f574416978279bb0ae62ab3c15",
        symbol: "POPCAT",
        icon: "https://raw.githubusercontent.com/PopCatRock/token-list/main/src/tokens/CoinLogos/0xdcE5726e3Bc8E1F574416978279bb0AE62AB3c15.png",
      },
      // You can add more tokens here...
    ],
  },
];

export const NATIVE_TOKEN_ICON_MAP: { [key in Chain["id"]]: string } = {
  7171: "https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fassets.geckoterminal.com%2Fli5zejj3rste71usjxzuwzdtitu4&w=32&q=75",
};
