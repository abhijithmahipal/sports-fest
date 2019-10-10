import { DocumentReference } from "@angular/fire/firestore";

export class Player {
    id: string;
    fullName: string;
    assists: number;
    goals: number;
    jerseyNumber: number;
    matchesPlayer: number;
    redCards: number;
    shortName: string;
    teamName: string;
    yellowCards: number;
}
