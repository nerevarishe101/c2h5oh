import { stringDeclination } from './utils.js';

describe('stringDeclination', () => {
  const labels: [string, string, string] = ['символ', 'символа', 'символов'];

  const getTestString = (testPart: string): string =>
    `Длина поля не может быть меньше чем ${testPart}`;

  it('should return the string in the correct declension', () => {
    expect(getTestString(stringDeclination(1, labels))).toEqual(
      getTestString(`1 ${labels[0]}`)
    );

    expect(getTestString(stringDeclination(2, labels))).toEqual(
      getTestString(`2 ${labels[1]}`)
    );

    expect(getTestString(stringDeclination(5, labels))).toEqual(
      getTestString(`5 ${labels[2]}`)
    );
  });
});
