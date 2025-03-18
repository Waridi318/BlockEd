"use client"

import type React from "react"
import { BookOpen, Clock } from "lucide-react"

export interface CourseProgress {
  id: string
  title: string
  description: string
  image: string
  progress: number
  modulesCompleted: number
  totalModules: number
  lastAccessed?: string
}

interface ProgressCardProps {
  course: CourseProgress
  onClick?: () => void
}

const ProgressCard: React.FC<ProgressCardProps> = ({ course, onClick }) => {
  return (
    <div
      className="relative group rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm"></div>

      <div className="relative border border-purple-500/30 rounded-xl overflow-hidden">
        {/* Course Image */}
        <div className="h-32 relative">
          <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="bg-gray-800/80 h-2 w-full">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-white">{course.title}</h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{course.description}</p>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <BookOpen className="w-3 h-3" />
              <span>
                {course.modulesCompleted}/{course.totalModules} Modules
              </span>
            </div>

            <div className="text-sm font-medium text-purple-400">{course.progress}% Complete</div>
          </div>

          {course.lastAccessed && (
            <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>Last accessed: {course.lastAccessed}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressCard

