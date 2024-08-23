import React from "react";
import { useToast } from "@chakra-ui/react";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { executeTransactionWithApproval } from "@/utils/approveTokens"; // Adjust the path as necessary
import { DirectListing, buyFromListing } from "thirdweb/extensions/marketplace";
import type { Account } from "thirdweb/wallets";

type Props = {
  listing: DirectListing;
  account: Account;
};

export default function BuyFromListingButton(props: Props) {
  const { account, listing } = props;
  const { marketplaceContract, refetchAllListings } = useMarketplaceContext();
  const toast = useToast();
  const activeAccount = useActiveAccount();

  const handleBuy = async () => {
    if (!listing || !activeAccount) {
      throw new Error("No valid listing or account found");
    }

    return executeTransactionWithApproval({
      chainId: 7171, // Replace with your actual chainId
      tokenAddress: listing.currencyContractAddress, // Replace with your actual token contract address
      spender: marketplaceContract.address,
      amount: listing.pricePerToken, // Replace with the actual amount needed for the transaction
      transactionCallback: async () => {
        const tx = await buyFromListing({
          contract: marketplaceContract,
          listingId: listing.id,
          quantity: listing.quantity,
          recipient: account.address,
        });
        return tx;
      },
    });
  };

  return (
    <TransactionButton
      disabled={activeAccount?.address === listing?.creatorAddress || !listing}
      transaction={handleBuy}
      onTransactionSent={() => {
        toast({
          title: "Purchasing...",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      }}
      onError={(error) => {
        console.error(error);
        toast({
          title: "Purchase Failed!",
          description: (error as Error).message,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }}
      onTransactionConfirmed={() => {
        toast({
          title: "Purchased Successfully!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        refetchAllListings();
      }}
    >
      Buy
    </TransactionButton>
  );
}
