export interface Checkpoint {
    id: string;
    name: string;
    max_score: number;
    pass_score: number;
    time_limit: string;
    category: string;
}

export interface CompletedCheckpoint {
    checkpoint_id: string;
    name: string;
    category: string;
    score: number;
}

export const DefaultCompletedCheckpoint: CompletedCheckpoint = {
    checkpoint_id: "",
    name: "",
    category: "",
    score: 0

}
export const DefaultCheckpoint: Checkpoint = {
    id: "",
    name: "",
    max_score: 100,
    pass_score: 50,
    time_limit: "",
    category: "",
}
