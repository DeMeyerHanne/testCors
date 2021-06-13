export default interface EditUserPut {
    userID: string;
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