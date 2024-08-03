import { Olympic } from "./Olympic";

// export type OlympicResponse = public olympics: Olympic[] | { error: boolean; message: string };

export class OlympicResponse {
    constructor(
        public olympics: Olympic[],
        public error: boolean,
        public message: string
    ) {}
}