import { Checkpoint, CompletedCheckpoint } from "../checkpoint/checkpoint";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    score: number;
    role: string;
    status: string;
    current_checkpoint?: string;
    completed_checkpoints: CompletedCheckpoint[];
}
  
export const DefaultUser: User = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  score: 0,
  role: "",
  status: "",
  current_checkpoint: "",
  completed_checkpoints: [],
};