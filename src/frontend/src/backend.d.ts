import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Submission {
    id: string;
    projectType: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    adminLogin(username: string, password: string): Promise<string>;
    getAll(): Promise<Array<Submission>>;
    getById(id: string): Promise<Submission>;
    getSubmissionCount(token: string): Promise<bigint>;
    getSubmissions(token: string): Promise<Array<Submission>>;
    submit(name: string, email: string, projectType: string, message: string): Promise<string>;
}
