"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  PlayCircle,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import MintButton from "@/components/MintButton";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";
import SongNFTAbi from "@/contracts/SongNFT.sol/SongNFT.json";
import { useRouter } from "next/navigation";

const TOKEN_ID = 0;
const PROGRESS = 1;

export default function ClientPage({
  courseId,
  initialData,
}: {
  courseId: string;
  initialData: any;
}) {
  const router = useRouter();
  const [activeChapter, setActiveChapter] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { toast } = useToast();
  const course = initialData;
  const { account, provider } = useWallet();
  const currentChapter = course.chapters[activeChapter];
  const progress = (completedChapters.length / course.chapters.length) * 100;

  const updateCourseProgress = async (signature: string) => {
    const signer = await provider?.getSigner();
    console.log("signer", signer);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      SongNFTAbi.abi,
      signer
    );

    const tx = await contract.updateCourseProgress(
      TOKEN_ID,
      PROGRESS,
      signature
    );
    const receipt = await tx.wait();

    toast.success(
      `NFT updated successfully! TX: ${receipt.hash.slice(0, 10)}...`
    );
  };

  const generateSignature = async () => {
    try {
      const response = await fetch("/api/generateSignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: account,
          tokenId: TOKEN_ID,
          progress: PROGRESS,
        }),
      });

      const { signature } = await response.json();
      return signature;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSign = async () => {
    const messageHash = ethers.solidityPackedKeccak256(
      ["address", "uint256", "uint8"],
      [account, TOKEN_ID, PROGRESS]
    );

    const msgEthHash = ethers.getBytes(messageHash);
    const signature1 = await generateSignature();
    console.log("signature1", signature1);
    if (!window.ethereum) return;
    // Request signature from MetaMask
    const signature =
      "0xf43c7ef0da73abe0227eb4e67f811de14847da90d6e6e5d653c8457ec20ecea011e8098d8859885cdcdc404741560978e91465fb23ea673149e17ee0f3de06b51c";
    // await window.ethereum.request({
    //   method: "personal_sign",
    //   params: [
    //     ethers.hexlify(msgEthHash),
    //     account, // Use the connected wallet address directly
    //   ],
    // });

    console.log("Signature:", signature);
    updateCourseProgress(signature1);
  };

  useEffect(() => {
    if (progress === 100 && courseId === "2") {
      handleSign();
      return;
    }
    if (progress === 100) {
      const toastId = toast(
        <div className="flex flex-col justify-center w-full items-center mt-2">
          <div className="text-[14px] font-bold mb-4">
            🦄 Awesome! You&apos;ve got an NFT reward! 🎉
          </div>
          <MintButton
            onMintSuccess={() => {
              toast.dismiss(toastId);
              router.push("/learn/2");
            }}
          />
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
        }
      );
    }
  }, [progress]);

  const handleQuizSubmit = () => {
    if (selectedAnswer === currentChapter.quiz.correctAnswer) {
      if (!completedChapters.includes(activeChapter)) {
        setCompletedChapters([...completedChapters, activeChapter]);
      }

      if (activeChapter < course.chapters.length - 1) {
        setTimeout(() => {
          setActiveChapter(activeChapter + 1);
          setShowQuiz(false);
          setSelectedAnswer(null);
        }, 500);
      }
    } else {
      toast.error("Incorrect Answer", {});
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Header */}
        <div className="mb-8">
          <Link
            href="/learn"
            className="inline-flex items-center text-[#00f3ff] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
            {course.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>{course.duration}</span>
            <span>•</span>
            <span>{course.level}</span>
            <span>•</span>
            <span className="text-[#ff00ff]">{course.points} total points</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Course Progress</span>
            <span className="text-sm text-[#00f3ff]">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chapter List */}
          <div className="space-y-4">
            {course.chapters.map((chapter: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setActiveChapter(index);
                  setShowQuiz(false);
                  setSelectedAnswer(null);
                }}
                className={cn(
                  "w-full p-4 rounded-lg text-left transition-all duration-300",
                  "neon-border bg-gray-900/30 backdrop-blur-sm hover:bg-gray-900/50",
                  activeChapter === index && "border-[#00f3ff] bg-gray-900/50"
                )}
              >
                <div className="flex items-start">
                  {completedChapters.includes(index) ? (
                    <CheckCircle className="w-5 h-5 text-[#00f3ff] mt-1 mr-3 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-medium text-white">
                      Chapter {index + 1}
                    </h3>
                    <p className="text-sm text-gray-400">{chapter.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {!showQuiz ? (
              <div className="p-6 rounded-lg neon-border bg-gray-900/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">
                  {currentChapter.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {currentChapter.content}
                </div>
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="mt-6 w-full bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Take Chapter Quiz
                </Button>
              </div>
            ) : (
              <div className="p-6 rounded-lg neon-border bg-gray-900/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">Chapter Quiz</h2>
                <div className="space-y-4">
                  <p className="text-lg mb-4">{currentChapter.quiz.question}</p>
                  {currentChapter.quiz.options.map(
                    (option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={cn(
                          "w-full p-4 rounded-lg text-left transition-all duration-300",
                          "border border-gray-700 hover:border-[#00f3ff]",
                          selectedAnswer === index &&
                            "border-[#00f3ff] bg-[#00f3ff]/10"
                        )}
                      >
                        {option}
                      </button>
                    )
                  )}
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={selectedAnswer === null}
                    className="mt-6 w-full bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white hover:opacity-90"
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
