import type React from "react"
import { Award, Star, Lock } from "lucide-react"

export interface Achievement {
  id: string
  title: string
  description: string
  image: string
  dateEarned?: string
  rarity: "common" | "rare" | "epic" | "legendary"
  isLocked: boolean
  progress?: number
  tokenReward?: number
}

interface AchievementCardProps {
  achievement: Achievement
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const rarityColors = {
    common: {
      bg: "from-green-600 to-teal-600",
      text: "text-green-400",
      border: "border-green-500/50",
    },
    rare: {
      bg: "from-blue-600 to-indigo-600",
      text: "text-blue-400",
      border: "border-blue-500/50",
    },
    epic: {
      bg: "from-purple-600 to-indigo-600",
      text: "text-purple-400",
      border: "border-purple-500/50",
    },
    legendary: {
      bg: "from-amber-500 to-orange-600",
      text: "text-amber-400",
      border: "border-amber-500/50",
    },
  }

  const rarityColor = rarityColors[achievement.rarity]

  return (
    <div
      className={`relative group rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 
      ${achievement.isLocked ? "opacity-70 hover:opacity-90" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm"></div>

      <div
        className={`relative border rounded-xl overflow-hidden ${achievement.isLocked ? "border-gray-700" : rarityColor.border}`}
      >
        <div className="aspect-square relative">
          {/* Badge Image */}
          <div
            className={`absolute inset-0 ${achievement.isLocked ? "bg-gray-900/80" : ""} flex items-center justify-center`}
          >
            {achievement.isLocked ? (
              <Lock className="w-12 h-12 text-gray-600" />
            ) : (
              <img
                src={achievement.image || "/placeholder.svg"}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Rarity Badge */}
          {!achievement.isLocked && (
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${rarityColor.bg} text-white`}
            >
              {achievement.rarity.toUpperCase()}
            </div>
          )}

          {/* Progress Overlay for locked achievements */}
          {achievement.isLocked && achievement.progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-gray-800 h-2 w-full">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <div className="text-center text-xs text-gray-400 py-1">{achievement.progress}% Complete</div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className={`font-bold ${achievement.isLocked ? "text-gray-400" : "text-white"}`}>{achievement.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>

          {achievement.dateEarned && (
            <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
              <Award className="w-3 h-3" />
              <span>Earned on {achievement.dateEarned}</span>
            </div>
          )}

          {achievement.tokenReward && !achievement.isLocked && (
            <div className="mt-3 flex items-center gap-1 text-xs text-amber-400">
              <Star className="w-3 h-3" />
              <span>+{achievement.tokenReward} EduTokens</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AchievementCard

