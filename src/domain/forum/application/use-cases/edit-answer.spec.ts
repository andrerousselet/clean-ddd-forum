import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { makeAnswer } from "@/test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1"),
    );
    inMemoryAnswersRepository.create(newAnswer);
    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toString(),
      content: "New example test content",
    });
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "New example test content",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1"),
    );
    inMemoryAnswersRepository.create(newAnswer);
    expect(() =>
      sut.execute({
        authorId: "author-2",
        answerId: newAnswer.id.toString(),
        content: "New example test content",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
