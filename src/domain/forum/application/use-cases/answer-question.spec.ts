import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer a question", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create an answer", async () => {
    const { answer } = await sut.execute({
      content: "New answer",
      questionId: "1",
      tutorId: "1",
    });
    expect(answer.content).toEqual("New answer");
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
