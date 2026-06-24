import { create, all } from 'mathjs';

const math = create(all);

export function generateTaylorSeries(expression, center, degree, variable = 'x') {
  const a = Number(center);
  if (!Number.isFinite(a)) {
    throw new Error('Center point must be a finite number.');
  }

  if (!Number.isInteger(degree) || degree < 0) {
    throw new Error('Taylor degree must be a whole number greater than or equal to 0.');
  }

  let current = math.parse(expression);
  let seriesExpression = '0';

  for (let k = 0; k <= degree; k += 1) {
    const value = current.evaluate({ [variable]: a });
    let numericValue = value;

    if (math.typeOf(value) === 'Complex') {
      if (!Number.isFinite(value.re) || value.im !== 0) {
        throw new Error(`Function or derivative is undefined at x = ${a}.`);
      }
      numericValue = value.re;
    }

    if (math.typeOf(value) === 'BigNumber') {
      numericValue = value.toNumber();
    }

    numericValue = Number(numericValue);
    if (!Number.isFinite(numericValue)) {
      throw new Error(`Function or derivative is undefined at x = ${a}.`);
    }

    const coefficient = numericValue / math.factorial(k);
    const term = k === 0
      ? `${coefficient}`
      : `${coefficient} * (${variable} - (${a}))^${k}`;

    seriesExpression = `${seriesExpression} + (${term})`;
    current = math.derivative(current, variable);
  }

  return math.simplify(math.parse(seriesExpression)).toString();
}
