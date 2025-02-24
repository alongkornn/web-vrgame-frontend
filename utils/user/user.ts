import { CompletedCheckpoint, DefaultCompletedCheckpoint } from "../checkpoint/checkpoint";

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
    completed_checkpoint?: CompletedCheckpoint[];
    created_at: number
    verify_email: boolean
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
  completed_checkpoint: [DefaultCompletedCheckpoint],
  verify_email: false,
  created_at: Date.now(),
};