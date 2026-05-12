import React, { useState } from 'react'
import { Question } from '../../types'

interface Props {
  question: Question
  onAnswer: (values: string[]) => void
  onSkip: () => void
  questionNumber: number
  totalQuestions: number
}

export const QuestionCard: React.FC<Props> = ({ question, onAnswer, onSkip, questionNumber, totalQuestions }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (value: string) => {
    if (question.multiSelect) {
      setSelected(prev => {
        const next = new Set(prev)
        if (next.has(value)) next.delete(value); else next.add(value)
        return next
      })
    } else {
      setSelected(new Set([value]))
      onAnswer([value])
    }
  }

  return (
    <div className="max-w-xl mx-auto pt-20 px-4 animate-fadeIn">
      <div className="text-xs text-gray-500 mb-2">问题 {questionNumber}/{totalQuestions}</div>
      <h2 className="text-2xl font-bold mb-8">{question.text}</h2>
      <div className="grid gap-3">
        {question.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={`p-4 rounded-xl border text-left transition-all duration-200 ${
              selected.has(opt.value)
                ? 'border-orange-500 bg-orange-500/10 text-white'
                : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600'
            }`}
          >
            <span className="text-xl mr-3">{opt.emoji}</span>
            {opt.label}
          </button>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        {question.multiSelect && (
          <button
            onClick={() => { if (selected.size > 0) onAnswer(Array.from(selected)) }}
            disabled={selected.size === 0}
            className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium"
          >
            确认
          </button>
        )}
        <button onClick={onSkip} className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-gray-200">
          跳过 →
        </button>
      </div>
    </div>
  )
}
