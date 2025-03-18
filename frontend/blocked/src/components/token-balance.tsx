import type React from "react"
import { Gem, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface TokenBalanceProps {
  balance: number
  transactions?: TokenTransaction[]
}

export interface TokenTransaction {
  id: string
  amount: number
  type: "earned" | "spent"
  description: string
  timestamp: string
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ balance, transactions = [] }) => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm"></div>

      <div className="relative border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
            <Gem className="w-6 h-6 text-white" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">EduTokens</h3>
            <p className="text-sm text-gray-400">Earn by completing courses and quizzes</p>
          </div>
        </div>

        <div className="flex items-end gap-2 mb-6">
          <div className="text-4xl font-bold text-white">{balance}</div>
          <div className="text-sm text-green-400 flex items-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>+12% this week</span>
          </div>
        </div>

        {transactions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Transactions</h4>
            <div className="space-y-3">
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${transaction.type === "earned" ? "bg-green-900/30" : "bg-red-900/30"}`}
                    >
                      {transaction.type === "earned" ? (
                        <ArrowUpRight className={`w-4 h-4 text-green-400`} />
                      ) : (
                        <ArrowDownRight className={`w-4 h-4 text-red-400`} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-white">{transaction.description}</p>
                      <p className="text-xs text-gray-400">{transaction.timestamp}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${transaction.type === "earned" ? "text-green-400" : "text-red-400"}`}>
                    {transaction.type === "earned" ? "+" : "-"}
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>

            {transactions.length > 3 && (
              <button className="w-full mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                View All Transactions
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenBalance

