export interface passport {
  type?: string,
  countryCode?: string,
  passSeries?: string,
  passNumber: string,
  holdersName: string,
  holdersSurname: string,
  holdersPatronymic?: string,
  holdersSex: string,
  holdersNationality?: string,
  holdersDateOfBirth: Date,
  holdersPlaceOfBirth: string,
  holdersPersonalNumber?: string,
  passDateOfIssue: Date,
  passDateOfExpiry?: Date
  passAuthority: string,
}

