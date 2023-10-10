import { expect, it } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"

it("should create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();
  const answer = answerQuestion.execute({
    content: "New answer",
    questionId: "1",
    tutorId: "1",
  })

  expect(answer.content).toEqual("New answer");
})