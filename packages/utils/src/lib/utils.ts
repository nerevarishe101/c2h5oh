/**
 * Склоняет слово в зависимости от числового значения.
 *
 * Пример:
 *
 * ```js
 * `Длина поля не может быть меньше чем ${stringDeclination(2, ['символ', 'символа', 'символов'])}`
 * ```
 *
 * В результате преобразуется в строку:
 *
 * ```js
 * `Длина поля не может быть меньше чем 2 символа`
 * ```
 * @param num - число
 * @param labels - массив из трёх строк
 */
export const stringDeclination = (
  num: number,
  labels: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return (
    num.toString() +
    ' ' +
    labels[
      num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
    ]
  );
};
