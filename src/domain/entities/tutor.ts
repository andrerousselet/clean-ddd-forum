import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface TutorProps {
  name: string;
}

export class Tutor extends Entity<TutorProps> {
  static create(
    props: TutorProps,
    id?: UniqueEntityID,
  ) {
    const tutor = new Tutor(props, id);
    return tutor;
  }
}