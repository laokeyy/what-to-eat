import React from 'react'
import { QuestionCard } from './QuestionCard'
import { useFlowStore } from '../../store/useFlowStore'

export const QuestionFlow: React.FC = () => {
  const { questions, currentQuestionIndex, answerQuestion, skipQuestion } = useFlowStore()
  if (currentQuestionIndex >= questions.length) return null
  const question = questions[currentQuestionIndex]
  return (
    <QuestionCard
      key={question.id}
      question={question}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      onAnswer={(values) => answerQuestion(question.id, values)}
      onSkip={skipQuestion}
    />
  )
}