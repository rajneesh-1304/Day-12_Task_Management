export interface Tasks {
    id: number;
    title: string;
    status: string;
    startTime: Date;
    endTime: Date;
    userId: number;
}

export interface SubTask {
    id: number;
    taskId: number;
    title: string;
    status: string;
    startTime: Date;
    endTime: Date;
}

export interface User {
    id: number;
    name: string;
    email: string;
}