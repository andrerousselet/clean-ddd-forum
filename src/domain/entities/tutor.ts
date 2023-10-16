import { Entity } from "../../core/entities/entity";

interface TutorProps {
  name: string;
}

export class Tutor extends Entity<TutorProps> {}