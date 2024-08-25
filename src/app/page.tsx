"use client";

import { useState } from 'react'; // Import useState for managing search state
import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useColorModeValue,
  VStack,
  Button,
  Input, // Import Input for search bar
} from "@chakra-ui/react";

// Define types for the contract and update objects
interface NftContract {
  address: string;
  chain: { id: number };
  thumbnailUrl?: string;
  title?: string; // Make title optional
}

interface Update {
  title: string;
  bullet_points: string[];
}

const HeroSection = () => {
  const titleColor = useColorModeValue("#f0e68c", "#ffd700"); // Gold for title
  const textColor = useColorModeValue("blue.800", "blue.100"); // Blue for the subtitle text

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="transparent" // Transparent background
      color={textColor}
      py={20}
      px={6}
      textAlign="center"
    >
      <Image 
        src="https://raw.githubusercontent.com/Excoinsevm/S/main/charm.png" // Replace with your image path
        alt="Hero Image"
        mb={4}
        boxSize="150px" // Adjust the size as needed
        borderRadius="full" // Makes the image circular
      />
      <Heading as="h1" size="2xl" mb={4} color={titleColor}>
        Lucky Charm NFTs
      </Heading>
      <Text fontSize="lg" mb={6} color={textColor}>
        Discover and trade NFTs on the Bitrock Chain seamlessly.
      </Text>
      <a href="https://www.luckycharmbitrock.net/" target="_blank" rel="noopener noreferrer">
      <Button colorScheme="teal" size="lg">
        Website
      </Button>
    </a>
    </Flex>
  );
};

const TrendingCollections = ({ contracts, hoverEffect, cardBg, cardBorderColor }: {
  contracts: NftContract[];
  hoverEffect: any;
  cardBg: string;
  cardBorderColor: string;
}) => (
  <VStack spacing={8} align="center" mt={10}>
    <Heading textAlign="center">Trending Collections</Heading>
    <Flex direction="row" wrap="wrap" gap={8} justifyContent="center">
      {contracts.map((item) => (
        <Link
          _hover={{ ...hoverEffect, textDecoration: "none" }}
          w={240}
          h={360}
          key={item.address}
          href={`/collection/${item.chain.id.toString()}/${item.address}`}
        >
          <Flex
            direction="column"
            align="center"
            bg={cardBg}
            border="1px"
            borderColor={cardBorderColor}
            shadow="lg"
            p={6}
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={item.thumbnailUrl ?? "/default-thumbnail.png"} alt={`${item.title} thumbnail`} borderRadius="lg" mb={4} />
            <Text fontSize="lg" fontWeight="bold">
              {item.title ?? "Untitled"} {/* Default value if title is undefined */}
            </Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  </VStack>
);

const LatestUpdates = ({ updates, hoverEffect, cardBg, cardBorderColor }: {
  updates: Update[];
  hoverEffect: any;
  cardBg: string;
  cardBorderColor: string;
}) => (
  <VStack spacing={8} align="center" mt={20}>
    <Heading textAlign="center">Latest Updates</Heading>
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8} mt={6}>
      {updates.map((item) => (
        <GridItem
          key={item.title}
          p={6}
          border="1px"
          borderColor={cardBorderColor}
          borderRadius="lg"
          bg={cardBg}
          shadow="lg"
          _hover={hoverEffect}
        >
          <Heading size="md" mb={4}>
            {item.title}
          </Heading>
          {item.bullet_points.map((pt) => (
            <Text pt={2} fontSize="md" key={pt}>
              {pt}
            </Text>
          ))}
        </GridItem>
      ))}
    </Grid>
  </VStack>
);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContracts, setFilteredContracts] = useState<NftContract[]>(NFT_CONTRACTS as NftContract[]);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorderColor = useColorModeValue("gray.200", "gray.700");
  const hoverEffect = useColorModeValue(
    { boxShadow: "xl", transform: "translateY(-4px)", transition: "all 0.3s" },
    { boxShadow: "dark-lg", transform: "translateY(-4px)", transition: "all 0.3s" }
  );

  // Update search term and filter contracts
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredContracts(
      NFT_CONTRACTS.filter(contract =>
        (contract.title ?? '').toLowerCase().includes(term) // Handle undefined title
      ) as NftContract[]
    );
  };

  return (
    <Flex direction="column" align="center">
      <HeroSection />
      <Box mt="24px" w="full" maxW="1200px" p={6}>
        <Flex direction="column" gap={10}>
          <Input
            placeholder="Search collections"
            value={searchTerm}
            onChange={handleSearch}
            mb={6}
            size="lg"
            variant="outline"
          />
          <TrendingCollections
            contracts={filteredContracts}
            hoverEffect={hoverEffect}
            cardBg={cardBg}
            cardBorderColor={cardBorderColor}
          />
          <LatestUpdates
            updates={_latestUpdates}
            hoverEffect={hoverEffect}
            cardBg={cardBg}
            cardBorderColor={cardBorderColor}
          />
        </Flex>
      </Box>
    </Flex>
  );
}

const _latestUpdates: Update[] = [
  {
    title: "Latest software",
    bullet_points: [
      "Built with the latest thirdweb SDK (v5) and Next.js 14 (App router)",
    ],
  },
  {
    title: "Multi-chain",
    bullet_points: [
      "Seamlessly trade and browse items on bitrock",
      "New chains support coming soon",
    ],
  },
  {
    title: "Multiple collections supported",
    bullet_points: [
      "The Lucky Charm NFTs supports multiple collections, you can view your owned NFTs and your listings",
      "If you wish to launch a collection on Lucky Charm NFTs you can contact @PopCatDev on Telegram",
    ],
  },
  {
    title: "Buy and Sell using any Currency",
    bullet_points: [
      "Select different currencies (BROCK20) when creating listings",
    ],
  }
];
