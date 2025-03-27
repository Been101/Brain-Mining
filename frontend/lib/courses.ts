export const courses = [
  {
    id: 1,
    title: "Solidity Fundamentals",
    category: "Programming",
    points: 300,
    duration: "4 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=2940&auto=format&fit=crop",
    chapters: [
      {
        title: "Introduction to Smart Contracts",
        content: "Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They run on blockchain networks, enabling trustless and automated transactions.",
        points: 50,
        quiz: {
          question: "What is the main advantage of smart contracts?",
          options: [
            "They require lawyers to execute",
            "They are self-executing and trustless",
            "They only work with paper money",
            "They need constant manual updates"
          ],
          correctAnswer: 1
        }
      },
      {
        title: "Solidity Data Types",
        content: "Solidity supports various data types including uint, int, bool, address, and string. Understanding these types is crucial for writing efficient smart contracts.",
        points: 75,
        quiz: {
          question: "Which data type is used to store Ethereum addresses in Solidity?",
          options: [
            "string",
            "uint256",
            "address",
            "bytes32"
          ],
          correctAnswer: 2
        }
      },
      {
        title: "Functions and Modifiers",
        content: "Functions are the executable units of code in Solidity. Modifiers can be used to automatically check conditions before executing functions.",
        points: 100,
        quiz: {
          question: "What is the purpose of a modifier in Solidity?",
          options: [
            "To store data on the blockchain",
            "To send Ether between accounts",
            "To check conditions before function execution",
            "To create new smart contracts"
          ],
          correctAnswer: 2
        }
      }
    ]
  },
  {
    id: 2,
    title: "Web3 Design Principles",
    category: "Design",
    points: 250,
    duration: "3 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2940&auto=format&fit=crop",
    chapters: [
      {
        title: "Introduction to Web3 UX",
        content: "Web3 user experience design requires understanding of blockchain concepts and how to make them accessible to users.",
        points: 50,
        quiz: {
          question: "What is a key consideration in Web3 UX design?",
          options: [
            "Making blockchain concepts accessible to users",
            "Using only black and white colors",
            "Avoiding user feedback",
            "Removing all animations"
          ],
          correctAnswer: 0
        }
      }
    ]
  },
  {
    id: 3,
    title: "DeFi Protocol Development",
    category: "Programming",
    points: 500,
    duration: "6 hours",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    chapters: [
      {
        title: "Understanding DeFi Protocols",
        content: "DeFi protocols are decentralized applications that provide financial services without traditional intermediaries.",
        points: 100,
        quiz: {
          question: "What is the main purpose of DeFi protocols?",
          options: [
            "To replace traditional banks entirely",
            "To provide centralized financial services",
            "To enable decentralized financial services",
            "To eliminate all financial transactions"
          ],
          correctAnswer: 2
        }
      }
    ]
  }
];