import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button, useToast, Spinner } from "@chakra-ui/react";
import { sendAndConfirmTransaction } from "thirdweb";
import { cancelListing } from "thirdweb/extensions/marketplace";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";
import { useState } from "react";

type Props = {
  account: Account;
  listingId: bigint;
};

export default function CancelListingButton(props: Props) {
  const { marketplaceContract, refetchAllListings, nftContract } =
    useMarketplaceContext();
  const switchChain = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const { account, listingId } = props;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    try {
      if (activeChain?.id !== nftContract.chain.id) {
        await switchChain(nftContract.chain);
      }
      
      setIsLoading(true);
      
      // Ensure cancelListing returns a prepared transaction
      const preparedTransaction = cancelListing({
        contract: marketplaceContract,
        listingId,
      });

      await sendAndConfirmTransaction({
        transaction: preparedTransaction,
        account,
      });

      toast({
        title: "Listing cancelled successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      refetchAllListings();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Cancelling Listing",
        description: (error as Error).message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCancel}
      isLoading={isLoading}
      loadingText="Cancelling..."
      colorScheme="red"
      variant="solid"
      _hover={{ bg: "red.600" }}
      _active={{ bg: "red.700" }}
      _focus={{ boxShadow: "outline" }}
    >
      Cancel Listing
    </Button>
  );
}
