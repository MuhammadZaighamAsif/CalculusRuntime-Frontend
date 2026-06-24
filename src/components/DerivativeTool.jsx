import { useEffect, useMemo, useRef, useState } from 'react';
import * as Plotly from 'plotly.js-dist-min';
import { computeDerivative, getExpressionVariables, normalizeExpression, parseFunction } from './derivativeEngine';
import { generateTaylorSeries } from './taylorSeries';
import { sampleExpression } from './graphUtils';
import './DerivativeTool.css';

const EXAMPLE_EXPRESSIONS = [
  { label: 'sin(x) + x²', value: 'sin(x) + x^2' },
  { label: 'cos(x)', value: 'cos(x)' },
  { label: 'x³ − 2x', value: 'x^3 - 2*x' },
  { label: 'exp(x)', value: 'exp(x)' },
  { label: 'sqrt(x^2 + 1)', value: 'sqrt(x^2 + 1)' },
];

const VARIABLE_OPTIONS = ['x', 'y', 'z', 't'];

function DerivativeTool() {
  const [expression, setExpression] = useState('sin(x) + x^2');
  const [activeVariable, setActiveVariable] = useState('x');
  const [fixedValues, setFixedValues] = useState({ y: '0', z: '0', t: '0' });
  const [center, setCenter] = useState('0');
  const [degree, setDegree] = useState(3);
  const [error, setError] = useState('');
  const [isComputing, setIsComputing] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState(
    'Hi, I’m TaylorX — your interactive instructor for derivatives and Taylor series. Pick an example or type your own function using mathjs syntax.'
  );
  const [derivativeExpression, setDerivativeExpression] = useState('');
  const [taylorExpression, setTaylorExpression] = useState('');
  const [dataSets, setDataSets] = useState(null);
  const plotRef = useRef(null);

  const normalizedExpression = useMemo(() => normalizeExpression(expression), [expression]);

  const detectedVariables = useMemo(() => {
    try {
      return getExpressionVariables(normalizedExpression);
    } catch {
      return [];
    }
  }, [normalizedExpression]);

  useEffect(() => {
    if (detectedVariables.length > 0 && !detectedVariables.includes(activeVariable)) {
      setActiveVariable(detectedVariables[0]);
    }
  }, [detectedVariables, activeVariable]);

  const otherVariables = detectedVariables.filter((name) => name !== activeVariable);

  const validation = useMemo(() => {
    const trimmed = normalizedExpression.trim();
    if (!trimmed) {
      return { status: 'idle', message: 'Enter a function to get started.' };
    }

    try {
      parseFunction(trimmed, activeVariable);
      const scopeHint = otherVariables.length > 0
        ? ` Other variables (${otherVariables.join(', ')}) will be held at the values you set below.`
        : '';
      return {
        status: 'valid',
        message: `Looks good! Taylor series and derivative will be computed with respect to ${activeVariable}.${scopeHint}`,
      };
    } catch (caught) {
      return { status: 'invalid', message: caught.message };
    }
  }, [normalizedExpression, activeVariable, otherVariables]);

  const buildScope = () => {
    const scope = {};
    otherVariables.forEach((name) => {
      const raw = fixedValues[name] ?? '0';
      const numeric = Number(String(raw).trim());
      if (!Number.isFinite(numeric)) {
        throw new Error(`Please enter a numeric value for ${name} (got "${raw}").`);
      }
      scope[name] = numeric;
    });
    return scope;
  };

  const handleCompute = async () => {
    setError('');
    setIsComputing(true);

    try {
      const trimmedExpression = normalizedExpression.trim();
      const trimmedCenter = center.trim();
      const numericCenter = Number(trimmedCenter);

      if (trimmedExpression.length === 0) {
        throw new Error('Please enter a valid function expression.');
      }

      if (!Number.isFinite(numericCenter)) {
        throw new Error('Center point must be a finite number.');
      }

      parseFunction(trimmedExpression, activeVariable);
      const scope = buildScope();

      const derivative = computeDerivative(trimmedExpression, activeVariable);
      const taylor = generateTaylorSeries(trimmedExpression, numericCenter, degree, activeVariable, scope);

      const originalData = sampleExpression(trimmedExpression, [-10, 10], 500, activeVariable, scope);
      const derivativeData = sampleExpression(derivative, [-10, 10], 500, activeVariable, scope);
      const taylorData = sampleExpression(taylor, [-10, 10], 500, activeVariable, scope);

      setDerivativeExpression(derivative);
      setTaylorExpression(taylor);
      setDataSets({ originalData, derivativeData, taylorData });
      setAssistantMessage(
        otherVariables.length > 0
          ? `Computed ∂/∂${activeVariable} and the degree-${degree} Taylor polynomial centered at ${activeVariable} = ${numericCenter}, with ${otherVariables.map((v) => `${v} = ${scope[v]}`).join(', ')}. Compare the three curves in the graph.`
          : `Computed f'(${activeVariable}) = ${derivative}. The Taylor polynomial (degree ${degree}, center ${activeVariable} = ${numericCenter}) is shown in red — watch how closely it tracks f near the center.`
      );
    } catch (caught) {
      const message = caught.message || 'Unable to compute the requested visualization.';
      setError(message);
      setDataSets(null);
      setDerivativeExpression('');
      setTaylorExpression('');
      setAssistantMessage(
        `I found a problem: ${message} Tip: use lowercase function names with parentheses — sin(x), cos(x), exp(x) — and ^ for powers (x^2).`
      );
    } finally {
      setIsComputing(false);
    }
  };

  useEffect(() => {
    if (!dataSets && !error && validation.status === 'idle') {
      setAssistantMessage(
        'Try an example below or type sin(x) + x^2. Functions use parentheses: sin(x), not sin x. Powers use ^: x^2.'
      );
    }
  }, [expression, center, degree, dataSets, error, validation.status]);

  useEffect(() => {
    if (!dataSets || !plotRef.current) {
      return;
    }

    const traces = [
      {
        x: dataSets.originalData.xValues,
        y: dataSets.originalData.yValues,
        mode: 'lines',
        name: `f(${activeVariable})`,
        line: { color: '#2563eb', width: 3, shape: 'spline' },
        connectgaps: false,
      },
      {
        x: dataSets.derivativeData.xValues,
        y: dataSets.derivativeData.yValues,
        mode: 'lines',
        name: `f'(${activeVariable})`,
        line: { color: '#16a34a', width: 2, dash: 'dash', shape: 'spline' },
        connectgaps: false,
      },
      {
        x: dataSets.taylorData.xValues,
        y: dataSets.taylorData.yValues,
        mode: 'lines',
        name: `Taylor (n=${degree})`,
        line: { color: '#dc2626', width: 3, dash: 'dot', shape: 'spline' },
        connectgaps: false,
      },
    ];

    const layout = {
      title: {
        text: `Derivative & Taylor Series in ${activeVariable}`,
        font: { size: 16, color: '#1e293b' },
      },
      xaxis: { title: activeVariable, zeroline: true, gridcolor: '#e2e8f0' },
      yaxis: { title: 'f', zeroline: true, gridcolor: '#e2e8f0' },
      legend: { orientation: 'h', xanchor: 'center', x: 0.5, y: -0.18 },
      margin: { l: 50, r: 20, t: 60, b: 70 },
      hovermode: 'closest',
      plot_bgcolor: 'rgba(248,250,252,0.6)',
      paper_bgcolor: 'transparent',
    };

    const config = { responsive: true, displayModeBar: false, scrollZoom: true };
    Plotly.react(plotRef.current, traces, layout, config);
  }, [dataSets, degree, activeVariable]);

  const applyExample = (example) => {
    setExpression(example.value);
    setError('');
    setDataSets(null);
    setDerivativeExpression('');
    setTaylorExpression('');
  };

  const updateFixedValue = (name, value) => {
    setFixedValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="derivative-tool">
      <section className="derivative-tool__hero">
        <div className="derivative-tool__hero-copy">
          <span className="derivative-tool__eyebrow">Taylor series made intuitive</span>
          <h1 className="derivative-tool__title">TaylorX</h1>
          <p className="derivative-tool__hero-tagline">Derivative & Taylor series formulas in one polished interactive workspace.</p>
          <div className="derivative-tool__formula-grid">
            <div className="derivative-tool__formula-card">
              <div className="derivative-tool__formula-label">Derivative formula</div>
              <div className="derivative-tool__formula-text">f&apos;(x) = lim<sub>h→0</sub> [f(x + h) - f(x)] / h</div>
            </div>
            <div className="derivative-tool__formula-card">
              <div className="derivative-tool__formula-label">Taylor series formula</div>
              <div className="derivative-tool__formula-text">Tₙ(x) = Σ<sub>k=0</sub><sup>n</sup> f⁽ᵏ⁾(a) / k! · (x - a)ᵏ</div>
            </div>
          </div>
          <div className="derivative-tool__hero-notes">
            <span>Functions: sin, cos, tan, exp, log, ln, sqrt, abs</span>
            <span>Variable: x</span>
          </div>
        </div>

        <div className="derivative-tool__hero-card">
          <h2>How it works</h2>
          <p>
            Enter a function, choose the active variable, set the expansion center, and TaylorX will compute the symbolic derivative and Taylor polynomial for you.
          </p>
          <p>
            The result panel shows the exact formulas while the graph makes the comparison between f, f′, and the approximation easy to understand.
          </p>
        </div>
      </section>

      <section className="derivative-tool__panel-grid">
        <div className="derivative-tool__panel-card">
          <h2>Input guide</h2>
          <div className="derivative-tool__syntax-grid">
            <div className="derivative-tool__syntax-item derivative-tool__syntax-item--good">
              <span className="derivative-tool__syntax-label">✓ Good</span>
              <p>Use parentheses and lowercase functions.</p>
              <code>sin(x) + x^2</code>
              <code>cos(x)</code>
            </div>
            <div className="derivative-tool__syntax-item derivative-tool__syntax-item--bad">
              <span className="derivative-tool__syntax-label">✗ Avoid</span>
              <p>Don’t omit parentheses or use superscript notation.</p>
              <code>sin x</code>
              <code>x²</code>
            </div>
          </div>
          <div className="derivative-tool__syntax-note">
            Supported functions: <strong>sin, cos, tan, exp, log, ln, sqrt, abs</strong>. Use <strong>^</strong> for powers.
          </div>
        </div>

        <aside className={`derivative-tool__panel-card derivative-tool__assistant-card${validation.status === 'valid' ? ' derivative-tool__assistant-card--ready' : ''}`}>
          <div className="assistant-badge">TaylorX</div>
          <h3>Assistant</h3>
          <p className="derivative-tool__assistant-message">{assistantMessage}</p>
          <div className={`derivative-tool__validation derivative-tool__validation--${validation.status}`}>
            <span className="derivative-tool__validation-icon">
              {validation.status === 'valid' ? '✓' : validation.status === 'invalid' ? '!' : '·'}
            </span>
            <span>{validation.message}</span>
          </div>
        </aside>
      </section>

      <section className="derivative-tool__examples-card">
        <div className="derivative-tool__examples-header">
          <div>
            <h2>Try an example</h2>
            <p>Load one of these sample functions instantly to see how TaylorX works.</p>
          </div>
        </div>
        <div className="derivative-tool__example-chips">
          {EXAMPLE_EXPRESSIONS.map((example) => (
            <button
              key={example.value}
              type="button"
              className={`derivative-tool__chip${expression === example.value ? ' derivative-tool__chip--active' : ''}`}
              onClick={() => applyExample(example)}
              title={example.note || example.value}
            >
              {example.label}
            </button>
          ))}
        </div>
      </section>

      <section className="derivative-tool__controls">
        <div className="derivative-tool__controls-grid">
          <div className="derivative-tool__control-panel">
            <h2>Function setup</h2>
            <div className="derivative-tool__group">
              <label htmlFor="function-input">Function f</label>
              <input
                id="function-input"
                type="text"
                value={expression}
                onChange={(event) => setExpression(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleCompute();
                  }
                }}
                placeholder="e.g. sin(x) + x^2"
                spellCheck={false}
                autoComplete="off"
              />
              <small className="derivative-tool__hint">Supported variables: x, y, z, t.</small>
            </div>

            <div className="derivative-tool__group">
              <label htmlFor="variable-select">Active variable</label>
              <select
                id="variable-select"
                value={activeVariable}
                onChange={(event) => setActiveVariable(event.target.value)}
              >
                {VARIABLE_OPTIONS.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <small className="derivative-tool__hint">Derivative and Taylor series use this variable.</small>
            </div>

            {otherVariables.length > 0 && (
              <div className="derivative-tool__group derivative-tool__group--fixed">
                <h3>Fixed variables</h3>
                {otherVariables.map((name) => (
                  <div key={name} className="derivative-tool__fixed-row">
                    <label htmlFor={`fixed-${name}`}>{name}</label>
                    <input
                      id={`fixed-${name}`}
                      type="text"
                      value={fixedValues[name] ?? '0'}
                      onChange={(event) => updateFixedValue(name, event.target.value)}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="derivative-tool__control-panel">
            <h2>Taylor settings</h2>

            <div className="derivative-tool__group">
              <label htmlFor="center-input">Center point a</label>
              <input
                id="center-input"
                type="text"
                value={center}
                onChange={(event) => setCenter(event.target.value)}
                placeholder="0"
              />
            </div>

            <div className="derivative-tool__group">
              <div className="derivative-tool__slider-label">
                <label htmlFor="degree-slider">Taylor degree n</label>
                <span className="derivative-tool__degree-value">{degree}</span>
              </div>
              <input
                id="degree-slider"
                type="range"
                min="1"
                max="10"
                value={degree}
                onChange={(event) => setDegree(Number(event.target.value))}
              />
            </div>

            <button
              className={`derivative-tool__button${isComputing ? ' derivative-tool__button--loading' : ''}`}
              type="button"
              onClick={handleCompute}
              disabled={isComputing || validation.status === 'invalid'}
            >
              {isComputing ? 'Computing…' : 'Compute'}
            </button>
          </div>
        </div>
      </section>

      {error && <div className="derivative-tool__error">{error}</div>}

      <section className="derivative-tool__workspace">
        <article className={`derivative-tool__visual-box${dataSets ? ' derivative-tool__visual-box--active' : ''}`}>
          <div className="derivative-tool__box-header">
            <h2 className="derivative-tool__box-title">Visualization</h2>
            <p>Compare the original function, its derivative, and the Taylor approximation in one graph.</p>
          </div>
          <div className="derivative-tool__plot-container">
            {!dataSets && (
              <div className="derivative-tool__plot-placeholder">
                <span>Enter a function and click Compute to see f, f&apos;, and the Taylor approximation.</span>
              </div>
            )}
            <div className="derivative-tool__plot" ref={plotRef} />
          </div>
        </article>

        <article className={`derivative-tool__summary-box${dataSets ? ' derivative-tool__summary-box--active' : ''}`}>
          <div className="derivative-tool__box-header">
            <h2 className="derivative-tool__box-title">Results</h2>
            <p>View the symbolic expressions for your derivative and the Taylor polynomial.</p>
          </div>

          <div className="derivative-tool__result-card">
            <h3>Symbolic derivative ∂/∂{activeVariable}</h3>
            <pre className="derivative-tool__expression">
              {derivativeExpression || 'Click Compute to generate the symbolic derivative.'}
            </pre>
          </div>

          <div className="derivative-tool__result-card">
            <h3>Taylor approximation (degree {degree})</h3>
            <pre className="derivative-tool__expression">
              {taylorExpression || 'Click Compute to generate the Taylor series expression.'}
            </pre>
          </div>

          <div className="derivative-tool__result-card derivative-tool__result-card--info">
            <h3>Graph guide</h3>
            <p>
              <strong>Blue</strong> — original function. <strong>Green</strong> — derivative. <strong>Red</strong> — Taylor polynomial.
              Use higher degree values to improve accuracy closer to the center point.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default DerivativeTool;
