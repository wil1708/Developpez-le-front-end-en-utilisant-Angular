// TODO: create here a typescript interface for a participation
export class Participation {

    constructor(
        public id: number,
        public year: Date,
        public city: string,
        public medalsCount: number,
        public athleteCount: number
    ) {}
}
