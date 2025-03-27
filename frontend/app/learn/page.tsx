"use client";

import { Book, Code, PenTool } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Solidity Fundamentals",
    category: "Programming",
    points: 300,
    duration: "4 hours",
    icon: Code,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Web3 Design Principles",
    category: "Design",
    points: 250,
    duration: "3 hours",
    icon: PenTool,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "DeFi Protocol Development",
    category: "Programming",
    points: 500,
    duration: "6 hours",
    icon: Book,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] cyber-grid pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
            Learning Center
          </h1>
          <p className="text-gray-400">Master Web3 development and earn rewards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <Link 
                key={course.id}
                href={`/learn/${course.id}`}
                className="group card-3d relative overflow-hidden rounded-xl neon-border bg-gray-900/30 backdrop-blur-sm transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0f]/80"></div>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#00f3ff]/10 text-[#00f3ff] rounded-full text-sm border border-[#00f3ff]/30">
                      {course.category}
                    </span>
                    <span className="text-gray-400 text-sm">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00f3ff] transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-[#00f3ff] mr-2" />
                      <span className="text-gray-400">{course.level}</span>
                    </div>
                    <span className="text-[#ff00ff]">{course.points} points</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}