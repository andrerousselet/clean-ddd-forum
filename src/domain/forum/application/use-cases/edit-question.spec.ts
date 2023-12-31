import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@/test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("question-1"),
    );
    inMemoryQuestionsRepository.create(newQuestion);
    await sut.execute({
      authorId: "author-1",
      questionId: newQuestion.id.toString(),
      title: "New example test title",
      content: "New example test content",
    });
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "New example test title",
      content: "New example test content",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("question-1"),
    );
    inMemoryQuestionsRepository.create(newQuestion);
    expect(() =>
      sut.execute({
        authorId: "author-2",
        questionId: newQuestion.id.toString(),
        title: "New example test title",
        content: "New example test content",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
