import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
  tutorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ tutorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer(content);
    return answer;
  } 
}