export default interface Users {
	userID: number;
	firstName: string;
	lastName: string;
	birthDate: string;
	weight: number;
	length: number;
	gender: string;
}

//static data for testing

export const UserData: Users[] = [
	{
		userID: 1,
		lastName: "DeVlaminck",
		firstName: "Kevin",
		birthDate: "24/5/5",
		weight: 45,
		length: 110,
		gender: "male",
	},
	{
		userID: 2,
		lastName: "DeBruine",
		firstName: "Kevin",
		birthDate: "24/5/5",
		weight: 42,
		length: 91,
		gender: "male",
	},
	{
		userID: 3,
		lastName: "Verveat",
		firstName: "Jan",
		birthDate: "24/5/5",
		weight: 69,
		length: 81,
		gender: "male",
	},
	{
		userID: 4,
		lastName: "Weewauters",
		firstName: "maxim",
		birthDate: "24/5/5",
		weight: 51,
		length: 185,
		gender: "male",
	},
	{
		userID: 5,
		lastName: "De Meyer",
		firstName: "Hanne",
		birthDate: "24/5/5",
		weight: 85,
		length: 175,
		gender: "female",
	},
	{
		userID: 6,
		lastName: "Vervaeke",
		firstName: "Milan",
		birthDate: "24/5/5",
		weight: 125,
		length: 175,
		gender: "male",
	},
	{
		userID: 7,
		lastName: "Roelens",
		firstName: "Caleb",
		birthDate: "24/5/5",
		weight: 254,
		length: 111,
		gender: "male",
	},
] as any;
