import {
  Box,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Tab,
  TabList,
  Tabs,
  Text,
  useBreakpointValue,
  Input,
  Button,
} from "@chakra-ui/react";
import { blo } from "blo";
import { shortenAddress } from "thirdweb/utils";
import { useState, useEffect } from "react";
import { NFT_CONTRACTS, type NftContract } from "@/consts/nft_contracts";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { getContract, toEther } from "thirdweb";
import { client } from "@/consts/client";
import { getOwnedERC721s } from "@/extensions/getOwnedERC721s";
import { OwnedItem } from "./OwnedItem";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import { Link } from "@chakra-ui/next-js";
import { getOwnedERC1155s } from "@/extensions/getOwnedERC1155s";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { ProfileMenu } from "./Menu";

type Props = {
  address: string;
};

export function ProfileSection(props: Props) {
  const { address } = props;
  const account = useActiveAccount();
  const isYou = address.toLowerCase() === account?.address.toLowerCase();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedCollection, setSelectedCollection] = useState<NftContract>(
    NFT_CONTRACTS[0]
  );
  const [username, setUsername] = useState<string | null>(null);
  const [inputUsername, setInputUsername] = useState<string>("");

  useEffect(() => {
    // Retrieve username from local storage on component mount
    const storedUsername = localStorage.getItem(`username_${address}`);
    setUsername(storedUsername);
  }, [address]);

  const handleSetUsername = () => {
    const formattedUsername = inputUsername.startsWith('$') ? inputUsername : `$${inputUsername}`;
    // Save username to local storage
    localStorage.setItem(`username_${address}`, formattedUsername);
    setUsername(formattedUsername);
    setInputUsername(''); // Clear input field after successful update
  };

  const contract = getContract({
    address: selectedCollection.address,
    chain: selectedCollection.chain,
    client,
  });

  const {
    data,
    error,
    isLoading: isLoadingOwnedNFTs,
  } = useReadContract(
    selectedCollection.type === "ERC1155" ? getOwnedERC1155s : getOwnedERC721s,
    {
      contract,
      owner: address,
      requestPerSec: 50,
      queryOptions: {
        enabled: !!address,
      },
    }
  );

  const chain = contract.chain;
  const marketplaceContractAddress = MARKETPLACE_CONTRACTS.find(
    (o) => o.chain.id === chain.id
  )?.address;
  if (!marketplaceContractAddress) throw Error("No marketplace contract found");
  const marketplaceContract = getContract({
    address: marketplaceContractAddress,
    chain,
    client,
  });
  const { data: allValidListings, isLoading: isLoadingValidListings } =
    useReadContract(getAllValidListings, {
      contract: marketplaceContract,
      queryOptions: { enabled: data && data.length > 0 },
    });
  const listings = allValidListings?.length
    ? allValidListings.filter(
        (item) =>
          item.assetContractAddress.toLowerCase() ===
            contract.address.toLowerCase() &&
          item.creatorAddress.toLowerCase() === address.toLowerCase()
      )
    : [];
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 3, xl: 4 });

  return (
    <Box px={{ lg: "50px", base: "20px" }}>
      <Flex direction={{ lg: "row", md: "column", sm: "column" }} gap={5} mb={6}>
        <Img
          src={ensAvatar ?? blo(address as `0x${string}`)}
          w={{ lg: 150, base: 100 }}
          borderRadius="md"
          boxShadow="md"
        />
        <Box my="auto">
          <Heading size="lg">{ensName ?? username ?? "Unnamed"}</Heading>
          <Text color="gray.500">{shortenAddress(address)}</Text>
        </Box>
      </Flex>

      {isYou && !username && (
        <Flex direction="column" mt={4}>
          <Text mb={2}>Set Your Username:</Text>
          <Input
            placeholder="Enter your username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
          <Button mt={2} onClick={handleSetUsername}>Save Username</Button>
        </Flex>
      )}

      <Flex direction={{ lg: "row", base: "column" }} gap="10" mt="20px">
        <ProfileMenu
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
        />
        <Box flex="1">
          {isLoadingOwnedNFTs ? (
            <Box>
              <Text>Loading...</Text>
            </Box>
          ) : (
            <>
              <Flex direction="row" justifyContent="space-between" mb={4}>
                <Tabs
                  variant="soft-rounded"
                  onChange={(index) => setTabIndex(index)}
                  isLazy
                  defaultIndex={0}
                >
                  <TabList>
                    <Tab>Owned ({data?.length})</Tab>
                    <Tab>Listings ({listings.length || 0})</Tab>
                  </TabList>
                </Tabs>
                <Link
                  href={`/collection/${selectedCollection.chain.id}/${selectedCollection.address}`}
                  color="blue.500"
                  fontWeight="bold"
                >
                  View collection <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex>
              <SimpleGrid columns={columns} spacing={4} p={4}>
                {tabIndex === 0 ? (
                  <>
                    {data && data.length > 0 ? (
                      data.map((item) => (
                        <OwnedItem
                          key={item.id.toString()}
                          nftCollection={contract}
                          nft={item}
                        />
                      ))
                    ) : (
                      <Box>
                        <Text>
                          {isYou
                            ? "You"
                            : ensName
                            ? ensName
                            : shortenAddress(address)}{" "}
                          {isYou ? "do" : "does"} not own any NFT in this
                          collection
                        </Text>
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    {listings && listings.length > 0 ? (
                      listings.map((item) => (
                        <Box
                          key={item.id}
                          rounded="lg"
                          borderWidth="1px"
                          borderColor="gray.200"
                          overflow="hidden"
                          _hover={{ boxShadow: "lg", cursor: "pointer" }}
                          as={Link}
                          href={`/collection/${contract.chain.id}/${
                            contract.address
                          }/token/${item.asset.id.toString()}`}
                          w="full"
                          maxW="250px"
                        >
                          <Flex direction="column" p={4}>
                            <MediaRenderer
                              client={client}
                              src={item.asset.metadata.image}
                              style={{ width: '100%', height: 'auto' }}
                            />
                            <Text mt={2} fontWeight="bold">
                              {item.asset?.metadata?.name ?? "Unknown item"}
                            </Text>
                            <Text mt={1} color="gray.600">
                              Price
                            </Text>
                            <Text>
                              {toEther(item.pricePerToken)}{" "}
                              {item.currencyValuePerToken.symbol}
                            </Text>
                          </Flex>
                        </Box>
                      ))
                    ) : (
                      <Box>
                        <Text>You do not have any listings with this collection</Text>
                      </Box>
                    )}
                  </>
                )}
              </SimpleGrid>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
