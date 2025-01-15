import { Checkpoint } from "../checkpoint/checkpoint";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
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
  score: 0,
  currentCheckpoint: {
    id: "1",
    name: "",
    maxScore: 0,
    passScore: 100,
    score: 0,
    time: "",
    timeLimit: "",
    category: "",
    created_at: "",
    updated_at: "",
    is_deleted: false

  },
  completedCheckpoint: [],
};