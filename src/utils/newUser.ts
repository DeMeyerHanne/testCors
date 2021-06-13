export default interface NewUser {
    // userID?: string; // automatisch vanuit db, objectID ook
    firstName: string;                          
    lastName: string;
    weight: number;
    length: number;
    gender: string;
    birthDate: Date;
    therapistID: string;
    description: string;
    sessionID: string;
}