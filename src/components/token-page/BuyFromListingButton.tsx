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
      toast({
        title: "Error",
        description: "No valid listing or account found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const preparedTransaction = await executeTransactionWithApproval({
        chainId: marketplaceContract.chain.id, // Use chain ID from the marketplace contract
        tokenAddress: listing.currencyContractAddress,
        spender: marketplaceContract.address,
        amount: listing.pricePerToken,
        transactionCallback: async () => {
          return buyFromListing({
            contract: marketplaceContract,
            listingId: listing.id,
            quantity: listing.quantity,
            recipient: account.address,
          });
        },
      });

      return preparedTransaction; // Ensure this is returned to be used by TransactionButton
    } catch (error) {
      toast({
        title: "Purchase Failed!",
        description: (error as Error).message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
      throw error; // Re-throw the error to be caught by TransactionButton
    }
  };

  return (
    <TransactionButton
      disabled={activeAccount?.address === listing?.creatorAddress || !listing}
      transaction={handleBuy} // Provide the transaction function
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
