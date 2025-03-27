import ClientPage from './ClientPage';

// Mock NFTs data - in a real app, this would come from your API or database
const mockNFTs = [
  {
    id: 1,
    name: "Cyber Fox",
    rarity: "common",
    level: 1,
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=cyber-fox&backgroundColor=00f3ff",
    price: 0.1,
    owner: "0x1234...5678",
    description: "A cunning digital fox with enhanced cybernetic abilities",
    evolutionStage: 1,
    rarityPercentage: 75,
    listingTime: "2024-03-15T10:00:00Z",
    transactionHistory: [
      {
        time: "2024-03-14T15:30:00Z",
        price: 0.08,
        from: "0xabcd...efgh",
        to: "0x1234...5678"
      }
    ]
  },
  {
    id: 2,
    name: "Digital Dragon",
    rarity: "rare",
    level: 2,
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=digital-dragon&backgroundColor=9d00ff",
    price: 0.3,
    owner: "0x5678...9abc",
    description: "A majestic dragon born from pure digital energy",
    evolutionStage: 2,
    rarityPercentage: 92,
    listingTime: "2024-03-14T09:00:00Z"
  },
  {
    id: 3,
    name: "Golden Guardian",
    rarity: "epic",
    level: 3,
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=golden-guardian&backgroundColor=ff00ff",
    price: 0.5,
    owner: "0x9abc...def0",
    description: "An ancient guardian forged in digital gold",
    evolutionStage: 3,
    rarityPercentage: 98,
    listingTime: "2024-03-13T14:00:00Z"
  }
];

// Add generateStaticParams function for static site generation
export async function generateStaticParams() {
  return mockNFTs.map((nft) => ({
    id: nft.id.toString(),
  }));
}

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const nft = mockNFTs.find((n) => n.id === parseInt(params.id));
  if (!nft) return <div>NFT not found</div>;

  return <ClientPage id={params.id} initialData={nft} />;
}