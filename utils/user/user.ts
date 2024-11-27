import { Checkpoint } from "../checkpoint/checkpoint";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    class: string;
    number: string;
    score: number;
    currentCheckpoint?: Checkpoint;
    completedCheckpoint: Checkpoint[];
}
  
export const DefaultUser: User = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  class: "",
  number: "",
  score: 0,
  completedCheckpoint: [],
};