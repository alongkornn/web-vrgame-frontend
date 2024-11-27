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