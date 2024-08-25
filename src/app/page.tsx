"use client";

import { useState } from 'react';
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
  Input,
} from "@chakra-ui/react";

interface NftContract {
  address: string;
  chain: { id: number };
  thumbnailUrl?: string;
  title?: string;
}

interface Update {
  title: string;
  bullet_points: string[];
}

const HeroSection = () => {
  const titleColor = useColorModeValue("#f0e68c", "#ffd700");
  const textColor = useColorModeValue("blue.800", "blue.100");
  const bgGradient = useColorModeValue(
    "linear(to-r, blue.400, purple.500)",
    "linear(to-r, gray.700, black)"
  );

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg={bgGradient}
      color={textColor}
      py={28} // Increased padding for more prominence
      px={6}
      textAlign="center"
      borderBottomRadius="3xl" // Adds a rounded edge at the bottom
    >
      <Image 
        src="https://raw.githubusercontent.com/Excoinsevm/S/main/charm.png"
        alt="Hero Image"
        mb={6}
        boxSize="200px" // Larger image size
        borderRadius="full"
        border="4px solid white" // Adds a border around the image for a pop effect
      />
      <Heading as="h1" size="3xl" mb={4} color={titleColor}>
        Lucky Charm NFTs
      </Heading>
      <Text fontSize="xl" mb={6} color={textColor}>
        Discover and trade NFTs on the Bitrock Chain seamlessly.
      </Text>
    </Flex>
  );
};

const TrendingCollections = ({ contracts, hoverEffect, cardBg, cardBorderColor }: {
  contracts: NftContract[];
  hoverEffect: any;
  cardBg: string;
  cardBorderColor: string;
}) => (
  <VStack spacing={12} align="center" mt={16}>
    <Heading textAlign="center" fontSize="3xl">
      Trending Collections
    </Heading>
    <Flex direction="row" wrap="wrap" gap={10} justifyContent="center">
      {contracts.map((item) => (
        <Link
          _hover={{ ...hoverEffect, textDecoration: "none" }}
          w={260} // Wider cards
          h={380} // Taller cards
          key={item.address}
          href={`/collection/${item.chain.id.toString()}/${item.address}`}
        >
          <Flex
            direction="column"
            align="center"
            bg={cardBg}
            border="1px"
            borderColor={cardBorderColor}
            shadow="2xl" // Stronger shadow
            p={8} // More padding
            borderRadius="2xl" // More rounded corners
            overflow="hidden"
            transition="transform 0.3s ease" // Smooth hover effect
            _hover={{ transform: "scale(1.05)" }} // Zoom effect on hover
          >
            <Image
              src={item.thumbnailUrl ?? "/default-thumbnail.png"}
              alt={`${item.title} thumbnail`}
              borderRadius="lg"
              mb={4}
              boxSize="180px" // Larger image size
              objectFit="cover"
            />
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              {item.title ?? "Untitled"}
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
  <VStack spacing={12} align="center" mt={24}>
    <Heading textAlign="center" fontSize="3xl">
      Latest Updates
    </Heading>
    <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={10} mt={6}>
      {updates.map((item) => (
        <GridItem
          key={item.title}
          p={8}
          border="1px"
          borderColor={cardBorderColor}
          borderRadius="2xl"
          bg={cardBg}
          shadow="2xl"
          _hover={{
            ...hoverEffect, // Spread the hoverEffect styles here
            transform: "scale(1.05)", // Add any additional hover styles here
          }}
          transition="transform 0.3s ease" // This can stay outside the _hover block
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredContracts(
      NFT_CONTRACTS.filter(contract =>
        (contract.title ?? '').toLowerCase().includes(term)
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
            variant="filled" // Changed to filled variant for better contrast
            borderRadius="full"
            shadow="md"
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
