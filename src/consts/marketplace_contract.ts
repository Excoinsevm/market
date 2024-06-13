import type { Chain } from "thirdweb";
import { bitrock } from "./chains";

type MarketplaceContract = {
  address: string;
  chain: Chain;
};

/**
 * You need a marketplace contract on each of the chain you want to support
 * Only list one marketplace contract address for each chain
 */
export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "0xE96952f138850Cd67a61Ac8D97AdB58b3119E157",
    chain: bitrock,
  },
];
