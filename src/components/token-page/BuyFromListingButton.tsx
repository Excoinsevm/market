import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { DirectListing, buyFromListing } from "thirdweb/extensions/marketplace";
import { useToast } from "@chakra-ui/react";
import type { Account } from "thirdweb/wallets";

type Props = {
  listing: DirectListing;
  account: Account;
};

export default function BuyFromListingButton(props: Props) {
  const { account, listing } = props;
  const { marketplaceContract, refetchAllListings, nftContract } = useMarketplaceContext();
  const toast = useToast();
  const activeAccount = useActiveAccount();

  return (
    <TransactionButton
      disabled={
        activeAccount?.address === listing?.creatorAddress || !listing
      }
      transaction={() => {
        if (!activeAccount) throw new Error("No account");
        if (listing) {
          return buyFromListing({
            contract: marketplaceContract,
            listingId: listing.id,
            quantity: listing.quantity,
            recipient: account.address,
          });
        } else {
          throw new Error("No valid listing found for this NFT");
        }
      }}
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
          description: error.message,
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
