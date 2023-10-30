import { CreateQuestionUseCase } from "./create-question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
};

it("should create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);
  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Test Question Title",
    content: "Test Question Content",
  });

  expect(question.id).toBeTruthy();
});
