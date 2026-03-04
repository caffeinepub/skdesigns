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
    getAll(): Promise<Array<Submission>>;
    getById(id: string): Promise<Submission>;
    submit(name: string, email: string, projectType: string, message: string): Promise<string>;
}
