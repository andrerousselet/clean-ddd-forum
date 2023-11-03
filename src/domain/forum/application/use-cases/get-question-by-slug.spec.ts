import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "@/test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by its slug", async () => {
    const newQuestion = makeQuestion({
      slug: new Slug("example-test-question"),
    });
    inMemoryQuestionsRepository.create(newQuestion);
    const { question } = await sut.execute({
      slug: "example-test-question",
    });
    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].slug).toEqual(question.slug);
  });
});
