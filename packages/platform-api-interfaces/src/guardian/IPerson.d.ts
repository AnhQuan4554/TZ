export interface IPerson {
  personId: string; //Person Id - Unique identifier for the person
  title: string; //Title - Title/name prefix
  familyName: string; //Family Name - Family name/Surname
  givenNames: string; //Given Names -Given name/first name
  identificationNumber?: string; //Identification Number - Number from the identification document
  identificationNumberType?: string; //Identification Number Type - Type of ID e.g. passport
  identificationNumberAuthority?: string; //Identification Number Authority - Authority that issued the ID e.g. Australian Government
}
