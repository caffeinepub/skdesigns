import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Submission {
    id: string;
    projectType: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface PortfolioItem {
    id: string;
    title: string;
    order: bigint;
    description: string;
    imageUrl: string;
    category: string;
}
export interface backendInterface {
    addPortfolioItem(token: string, title: string, category: string, description: string, imageUrl: string): Promise<string>;
    adminLogin(username: string, password: string): Promise<string>;
    deletePortfolioItem(token: string, id: string): Promise<boolean>;
    getAll(): Promise<Array<Submission>>;
    getById(id: string): Promise<Submission>;
    getPortfolioItems(): Promise<Array<PortfolioItem>>;
    getSubmissionCount(token: string): Promise<bigint>;
    getSubmissions(token: string): Promise<Array<Submission>>;
    submit(name: string, email: string, projectType: string, message: string): Promise<string>;
    updatePortfolioItem(token: string, id: string, title: string, category: string, description: string, imageUrl: string): Promise<boolean>;
}
