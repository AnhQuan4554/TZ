export enum EnumPolicyNames {
  Tymlez_CET = 'TYMLEZ - Carbon Emissions Measurement - GHG Corporate Standard (CET)',
  Tymlez_CRU = 'TYMLEZ - Carbon Reduction Measurement  - GHG Corporate Standard (CRU)',
  Tymlez_GOO = 'TYMLEZ - Guarantee Of Origin',
  Tymlez_REC = 'TYMLEZ - Renewable Energy Certificate',
}

export enum EnumPolicyTags {
  Tymlez_CET = 'Tymlez_CET',
  Tymlez_CRU = 'Tymlez_CRU',
  Tymlez_GOO = 'Tymlez_GOO',
  Tymlez_REC = 'Tymlez_REC',
}

export enum EnumPolicyTokenSymbol {
  Tymlez_CET = 'TYM_CET',
  Tymlez_CRU = 'TYM_CRU',
  Tymlez_GOO = 'TYM_GOO',
  Tymlez_REC = 'TYM_REC',
}

export function lookupPolicyTagByName(
  name: string,
): EnumPolicyTags | undefined {
  const found = Object.entries(EnumPolicyNames).find(([_, v]) => v === name);
  const foundKey = found && found[0];

  return EnumPolicyTags[foundKey as keyof typeof EnumPolicyTags];
}

export function lookupPolicyNameByTag(
  tag: string,
): EnumPolicyNames | undefined {
  const found = Object.entries(EnumPolicyTags).find(([_, v]) => v === tag);
  const foundKey = found && found[1];

  return EnumPolicyNames[foundKey as keyof typeof EnumPolicyNames];
}
