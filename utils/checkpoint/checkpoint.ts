import { Score } from "@mui/icons-material";

export interface Checkpoint {
    id: string;
    name: string;
    maxScore: number;
    passScore: number;
    score: number;
    time: string;
    timeLimit: string;
    category: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean
}

