import { lookupPolicyTagByName, lookupPolicyNameByTag } from './policy';

describe('lookupPolicyTagByName', () => {
  it('should lookup policy tag by name', () => {
    expect(lookupPolicyTagByName('TYMLEZ - Guarantee Of Origin')).toBe(
      'Tymlez_GOO',
    );
  });
});

describe('lookupPolicyTagByName', () => {
  it('should lookup policy tag by name', () => {
    expect(lookupPolicyNameByTag('Tymlez_GOO')).toBe(
      'TYMLEZ - Guarantee Of Origin',
    );
  });
});
