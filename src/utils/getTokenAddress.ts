import { SUPPORTED_TOKENS } from "../../src/consts/supported_tokens";
import { Chain } from "thirdweb";

export const getTokenAddress = (chainId: Chain["id"], symbol: string) => {
  const supportedTokens = SUPPORTED_TOKENS.find(
    (tokenSet) => tokenSet.chain.id === chainId
  );
  if (!supportedTokens) {
    throw new Error(`Chain ID ${chainId} not supported`);
  }

  const token = supportedTokens.tokens.find((token) => token.symbol === symbol);
  if (!token) {
    throw new Error(`Token symbol ${symbol} not supported`);
  }

  return token.tokenAddress;
};
