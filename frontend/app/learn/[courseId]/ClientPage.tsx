'use client'
import { useState } from 'react'
import { ArrowLeft, CheckCircle, Circle, PlayCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function ClientPage({ 
  courseId,
  initialData
}: {
  courseId: string
  initialData: any
}) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { toast } = useToast();

  const course = initialData;
  if (!course) return <div>Course not found</div>;

  const currentChapter = course.chapters[activeChapter];
  const progress = (completedChapters.length / course.chapters.length) * 100;

  const handleQuizSubmit = () => {
    if (selectedAnswer === currentChapter.quiz.correctAnswer) {
      const points = currentChapter.points;
      
      toast({
        title: "Quiz Completed! 🎉",
        description: (
          <div className="relative">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#00f3ff]" />
              <span>You earned {points} points!</span>
            </div>
          </div>
        )
      });

      if (!completedChapters.includes(activeChapter)) {
        setCompletedChapters([...completedChapters, activeChapter]);
      }

      if (activeChapter < course.chapters.length - 1) {
        setTimeout(() => {
          setActiveChapter(activeChapter + 1);
          setShowQuiz(false);
          setSelectedAnswer(null);
        }, 1500);
      }
    } else {
      toast({
        title: "Incorrect Answer",
        description: "Try again!",
        variant: "destructive"
      });
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
            <span className="text-sm text-[#00f3ff]">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chapter List */}
          <div className="space-y-4">
            {course.chapters.map((chapter, index) => (
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
                    <h3 className="font-medium text-white">Chapter {index + 1}</h3>
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
                <h2 className="text-2xl font-bold mb-4">{currentChapter.title}</h2>
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
                  {currentChapter.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={cn(
                        "w-full p-4 rounded-lg text-left transition-all duration-300",
                        "border border-gray-700 hover:border-[#00f3ff]",
                        selectedAnswer === index && "border-[#00f3ff] bg-[#00f3ff]/10"
                      )}
                    >
                      {option}
                    </button>
                  ))}
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