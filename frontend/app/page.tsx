import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, Trophy, Wallet } from "lucide-react";

const dapps = [
  {
    title: "Simple Greeting",
    description: "Send and receive greetings on the blockchain",
    features: [
      "Simple greetings dapp",
      "Send and receive greetings onchain",
      "Display the last greeting",
    ],
    route: "/simple-greeting-dapp",
  },
  {
    title: "Study Timer Tracker",
    description: "Track study time on the blockchain",
    features: [
      "Start and stop a study timer",
      "Record study session duration",
      "Display total study time",
    ],
    route: "/study-time-dapp",
  },
  {
    title: "Student Anonymous Feedback",
    description: "Submit anonymous feedback about courses",
    features: [
      "Simple feedback form",
      "Store feedback on-chain anonymously",
      `Only educators with ocid usernames that start with 'edu_' can view aggregated feedback.`,
    ],
    route: "/anonymous-feedback-dapp",
  },
  {
    title: "Assignment Submission",
    description: "Submit proof of assignment completion",
    features: [
      "Upload assignment details",
      "Store submission details on-chain",
      `Only educators ocid with usernames that start with 'edu_' can verify and view submissions.`,
    ],
    route: "/assignment-submission-dapp",
  },
  {
    title: "Classroom Poll",
    description: "Conduct quick polls during class sessions",
    features: [
      "Create and display polls",
      "Record votes on-chain",
      "Real-time poll results",
    ],
    route: "/class-poll-dapp",
  },
  {
    title: "Study Group Chat",
    description: "Students share messages in a group chat.",
    features: [
      "Join group chat and share messages",
      "Record messages on-chain",
      "Show the Messages",
    ],
    route: "/student-group-dapp",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] cyber-grid">
      <Header />
      <main className="min-h-screen ">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                Learn to Earn in Web3
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Master blockchain development, earn points, and mint unique NFTs
              </p>
              <Link
                href="/learn"
                className="inline-flex items-center px-8 py-3 neon-border rounded-md text-[#00f3ff] hover:text-white bg-[#0a0a0f]/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 neon-glow"
              >
                Start Learning <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Interactive Learning",
                description: "Comprehensive courses in blockchain development",
                color: "from-[#00f3ff]",
              },
              {
                icon: Trophy,
                title: "Earn Points",
                description: "Complete courses and challenges to earn rewards",
                color: "from-[#ff00ff]",
              },
              {
                icon: Wallet,
                title: "NFT Rewards",
                description: "Convert your points into unique NFTs",
                color: "from-[#9d00ff]",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card-3d p-6 rounded-lg bg-gray-900/30 backdrop-blur-sm neon-border transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-r ${feature.color} to-transparent p-0.5`}
                >
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#00f3ff]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
