// TODO: create here a typescript interface for an olympic country
import { Participation } from "./Participation";

export class Olympic {
    [x: string]: any;

    constructor(
        public id: number,
        public country: string,
        public participations: Participation[],
    ) {}
}
