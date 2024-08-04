// TODO: create here a typescript interface for an olympic country
import { Participation } from "./Participation";

export class Olympic {

    constructor(
        public id: number,
        public country: string,
        public participations: Participation[],
        public errorMessage : string = 'Erreur de chargement des données'
    ) {}
}
