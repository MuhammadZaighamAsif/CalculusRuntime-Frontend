import { create, all } from 'mathjs';

const math = create(all);

export function sampleExpression(expression, range = [-10, 10], points = 500, variable = 'x', scope = {}) {
  const node = math.parse(expression);
  const compiled = node.compile();
  const [min, max] = range;
  const step = (max - min) / Math.max(points - 1, 1);

  const xValues = new Array(points);
  const yValues = new Array(points);

  for (let index = 0; index < points; index += 1) {
    const x = min + step * index;
    let y = null;

    try {
      const result = compiled.evaluate({ ...scope, [variable]: x });
      if (typeof result === 'number' && Number.isFinite(result)) {
        y = result;
      } else if (math.typeOf(result) === 'Complex' && Number.isFinite(result.re) && result.im === 0) {
        y = result.re;
      } else if (math.typeOf(result) === 'BigNumber') {
        const numberResult = result.toNumber();
        if (Number.isFinite(numberResult)) {
          y = numberResult;
        }
      }
    } catch {
      y = null;
    }

    xValues[index] = x;
    yValues[index] = y;
  }

  return { xValues, yValues };
}
