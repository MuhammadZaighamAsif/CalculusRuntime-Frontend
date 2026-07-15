import StudyGuideShell from "./StudyGuideShell";
import "./PartialDerivativesGuide.css";
import {
  LimitsExtendedPart1,
  LimitsExtendedPart2,
} from "./GuideExtendedMaterials";

function Divider() {
  return <hr className="divider" />;
}

function GuideSidebarPart1() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Limits & Continuity · Part 1"}</div>
      </div>
      <a className="sb-link" href="#lc-1">{"Limits of Two Variables"}</a>
      <a className="sb-link" href="#lc-2">{"Two-Path Test"}</a>
      <a className="sb-link" href="#lc-3">{"Squeeze Theorem"}</a>
      <a className="sb-link" href="#lc-quiz1">{"Practice Quiz"}</a>
    </nav>
  );
}

function GuideSidebarPart2() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Limits & Continuity · Part 2"}</div>
      </div>
      <a className="sb-link" href="#lc-4">{"Continuity at a Point"}</a>
      <a className="sb-link" href="#lc-5">{"Continuity on a Region"}</a>
      <a className="sb-link" href="#lc-quiz2">{"Practice Quiz"}</a>
    </nav>
  );
}

function GuideHeaderPart1() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 1 OF 2"}</p>
      <h1 className="ch-title">{"Limits & Continuity"}</h1>
      <p className="ch-sub">{"Limits of Multivariable Functions, Path Dependence & The Squeeze Theorem"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function GuideHeaderPart2() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 2 OF 2"}</p>
      <h1 className="ch-title">{"Continuity"}</h1>
      <p className="ch-sub">{"Continuity at a Point, Continuity on a Region & Compositions"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function TableOfContentsPart1() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 1 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#lc-1">{"Limits of Two Variables"}</a>
        <a className="toc-a" href="#lc-2">{"Two-Path Test"}</a>
        <a className="toc-a" href="#lc-3">{"Squeeze Theorem"}</a>
        <a className="toc-a" href="#lc-quiz1">{"Practice Quiz"}</a>
      </div>
    </div>
  );
}

function TableOfContentsPart2() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 2 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#lc-4">{"Continuity at a Point"}</a>
        <a className="toc-a" href="#lc-5">{"Continuity on a Region"}</a>
        <a className="toc-a" href="#lc-quiz2">{"Practice Quiz"}</a>
      </div>
    </div>
  );
}

function SectionLC1() {
  return (
    <section className="section" id="lc-1">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Limits of Functions of Two Variables"}</h2>
      <p>
        {"We say $\\lim_{(x,y)\\to(a,b)} f(x,y) = L$ if $f(x,y)$ can be made arbitrarily close to $L$ by taking $(x,y)$ sufficiently close to $(a,b)$, regardless of the direction of approach."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Limit"}</div>
        <p>
          {"For every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $0 < \\sqrt{(x-a)^2+(y-b)^2} < \\delta \\Rightarrow |f(x,y)-L| < \\varepsilon$."}
        </p>
      </div>
      <h3 className="subsec">{"Direct Substitution"}</h3>
      <p>
        {"If $f$ is a polynomial or rational function and the denominator is non-zero at $(a,b)$, simply substitute directly."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Find $\\lim_{(x,y)\\to(1,2)} (3x^2 + y)$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Substitute directly: $3(1)^2 + 2 = 5$."}</p>
          <div className="fml">{"$$\\lim_{(x,y)\\to(1,2)} (3x^2+y) = 5$$"}</div>
        </div>
      </div>
    </section>
  );
}

function SectionLC2() {
  return (
    <section className="section" id="lc-2">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Two-Path Test"}</h2>
      <p>
        {"If two different paths to $(a,b)$ give different limit values, the overall limit does not exist."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Show $\\lim_{(x,y)\\to(0,0)} \\dfrac{xy}{x^2+y^2}$ does not exist."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Along $y=0$: limit $= 0$."}</p>
          <p>{"Along $y=x$: limit $= \\dfrac{1}{2}$."}</p>
          <p>{"Two paths give different values \u2014 limit does not exist."}</p>
        </div>
      </div>
    </section>
  );
}

function SectionLC3() {
  return (
    <section className="section" id="lc-3">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Squeeze Theorem for Two Variables"}</h2>
      <p>
        {"If $|f(x,y)| \\leq g(x,y)$ near $(a,b)$ and $\\lim g = 0$, then $\\lim f = 0$."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\lim_{(x,y)\\to(0,0)} \\dfrac{x^2 y}{x^2+y^2}$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>
            {"Since $x^2 \\leq x^2+y^2$, we get $\\left|\\dfrac{x^2 y}{x^2+y^2}\\right| \\leq |y| \\to 0$."}
          </p>
          <div className="fml">
            {"$$\\lim_{(x,y)\\to(0,0)} \\frac{x^2 y}{x^2+y^2} = 0$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLC4() {
  return (
    <section className="section" id="lc-4">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Continuity at a Point"}</h2>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Continuity"}</div>
        <p>{"$f$ is continuous at $(a,b)$ if all three hold:"}</p>
        <ol>
          <li>{"$f(a,b)$ is defined."}</li>
          <li>{"$\\lim_{(x,y)\\to(a,b)} f(x,y)$ exists."}</li>
          <li>{"The limit equals $f(a,b)$."}</li>
        </ol>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Is $f(x,y) = \\dfrac{x^2-y^2}{x^2+y^2}$ continuous at $(0,0)$?"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Along $y=0$: limit $=1$. Along $x=0$: limit $=-1$."}</p>
          <p>{"Limit does not exist \u2014 not continuous at the origin."}</p>
        </div>
      </div>
    </section>
  );
}

function SectionLC5() {
  return (
    <section className="section" id="lc-5">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Continuity on a Region"}</h2>
      <p>
        {"$f$ is continuous on an open set $D$ if it is continuous at every point in $D$. Polynomials, rational functions (away from denominator zeros), and compositions of continuous functions are all continuous on their domains."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Key Fact"}</div>
        <p>
          {"If $f$ and $g$ are continuous at $(a,b)$, then so are $f+g$, $f \\cdot g$, and $f/g$ (provided $g(a,b) \\neq 0$)."}
        </p>
      </div>
    </section>
  );
}

function SectionLCEnrichment() {
  return (
    <section className="section" id="lc-enrich">
      <div className="sec-badge">{"Deeper Dive"}</div>
      <h2 className="sec-title">{"Path Tests vs. Polar Bounds"}</h2>
      <p>
        {"Different path limits prove nonexistence, but matching paths never prove existence. When a polar bound $|f|\\le g(r)\\to 0$, the squeeze theorem closes the argument for every approach."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>{"Existence is a single number approached in every way; polar/squeeze tools are the positive tests, while two-path mismatches are the negative tests."}</p>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"$f=\\frac{x^2 y}{x^4+y^2}$ along $y=mx^2$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Substitute to get $\\frac{m}{1+m^2}$, which depends on $m$ — so the overall limit at the origin does not exist."}</p>
        </div>
      </div>
    </section>
  );
}

function LimitsQuiz({ part }) {
  if (part === 1) {
    return (
      <section className="mcq-section" id="lc-quiz1">
        <div className="mcq-section-head">
          <span className="mcq-section-badge">{"Practice"}</span>
          <h2 className="mcq-section-title">{"Part 1 Quiz"}</h2>
        </div>
        <div className="mcq-score-strip">
          <span className="score-lbl">{"Score"}</span>
          <span className="score-val" id="scorelimits-p1">{"0 / 5"}</span>
          <span className="score-lbl" style={{ marginLeft: "auto", opacity: "0.4" }}>
            {"Click an option then reveal answer"}
          </span>
        </div>

        <div className="mcq-card" data-section="limits-p1" data-q="1" data-answer="A">
          <div className="mcq-q-row">
            <div className="mcq-num">{"1"}</div>
            <div className="mcq-q-text">{"Which condition must hold for a multivariable limit to exist?"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"The limit along every path must be equal."}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"The limit along the x-axis must equal the limit along the y-axis only."}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$f(a,b)$ must be defined."}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"The function must be differentiable at $(a,b)$."}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: A"}</span>
            <div className="mcq-explanation">{"In two or more variables, path-independence of the limit value is required for the limit to exist."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="limits-p1" data-q="2" data-answer="D">
          <div className="mcq-q-row">
            <div className="mcq-num">{"2"}</div>
            <div className="mcq-q-text">{"For $f(x,y) = \\frac{xy}{x^2 + y^2}$, the limit as $(x,y)\\to(0,0)$:"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"equals $0$"}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"equals $1$"}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"equals $1/2$"}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"does not exist"}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: D"}</span>
            <div className="mcq-explanation">{"Along $y=mx$ the limit is $\\frac{m}{1+m^2}$, which depends on $m$, so the overall limit does not exist."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="limits-p1" data-q="3" data-answer="B">
          <div className="mcq-q-row">
            <div className="mcq-num">{"3"}</div>
            <div className="mcq-q-text">{"Squeeze Theorem: if $|f(x,y)| \\le g(x,y)$ and $\\lim g = 0$, then:"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"$\\lim f = 1$"}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"$\\lim f = 0$"}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$\\lim f$ does not exist"}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"$f$ is continuous"}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: B"}</span>
            <div className="mcq-explanation">{"Since $-g \\le f \\le g$ and both bounding functions go to 0, $f$ is squeezed to 0."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="limits-p1" data-q="4" data-answer="C" data-difficulty="medium">
          <div className="mcq-q-row">
            <div className="mcq-num">{"4"}</div>
            <div className="mcq-q-text">{"(Medium) Along $y=x^2$, $\\lim_{(x,y)\\to(0,0)}\\frac{x^2 y}{x^4+y^2}$ equals:"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"$0$"}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"$1$"}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$1/2$"}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"does not exist along this path"}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: C"}</span>
            <div className="mcq-explanation">{"Substitute $y=x^2$: $\\frac{x^4}{x^4+x^4}=\\frac{1}{2}$."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="limits-p1" data-q="5" data-answer="B" data-difficulty="hard">
          <div className="mcq-q-row">
            <div className="mcq-num">{"5"}</div>
            <div className="mcq-q-text">{"(Hard) Polar: if $f=r\\cos\\theta\\sin\\theta$ as $r\\to 0$, what happens?"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Limit fails because $\\theta$ is free"}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"Limit is $0$ for every approach"}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"Limit is $1/2$"}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"Limit is $1$"}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: B"}</span>
            <div className="mcq-explanation">{"$|r\\cos\\theta\\sin\\theta|\\le r/2\\to 0$ uniformly in $\\theta$, so the limit is 0."}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mcq-section" id="lc-quiz2">
      <div className="mcq-section-head">
        <span className="mcq-section-badge">{"Practice"}</span>
        <h2 className="mcq-section-title">{"Part 2 Quiz"}</h2>
      </div>
      <div className="mcq-score-strip">
        <span className="score-lbl">{"Score"}</span>
        <span className="score-val" id="scorelimits-p2">{"0 / 5"}</span>
        <span className="score-lbl" style={{ marginLeft: "auto", opacity: "0.4" }}>
          {"Click an option then reveal answer"}
        </span>
      </div>

      <div className="mcq-card" data-section="limits-p2" data-q="1" data-answer="C">
        <div className="mcq-q-row">
          <div className="mcq-num">{"1"}</div>
          <div className="mcq-q-text">{"$f(x,y)$ is continuous at $(a,b)$ if:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"It is defined at $(a,b)$ only."}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"The limit exists but may differ from $f(a,b)$."}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$f(a,b)$ is defined, the limit exists, and they are equal."}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"It is differentiable at $(a,b)$."}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: C"}</span>
          <div className="mcq-explanation">{"Continuity requires the function value to match the limiting value."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="limits-p2" data-q="2" data-answer="B">
        <div className="mcq-q-row">
          <div className="mcq-num">{"2"}</div>
          <div className="mcq-q-text">{"Is $f(x,y)=\\frac{x^2-y^2}{x^2+y^2}$ continuous at the origin?"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Yes, it is a rational function."}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"No, the limit does not exist at the origin."}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"Yes, because $f(0,0)=0$."}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"No, the domain excludes the origin."}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: B"}</span>
          <div className="mcq-explanation">{"Along $y=0$ the limit is 1; along $x=0$ it is $-1$. Different path limits mean discontinuity (even after any redefinition at the origin)."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="limits-p2" data-q="3" data-answer="B">
        <div className="mcq-q-row">
          <div className="mcq-num">{"3"}</div>
          <div className="mcq-q-text">{"Compositions of continuous functions are:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Always discontinuous"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"Continuous wherever the composition is defined"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"Only continuous on closed sets"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"Differentiable but not continuous"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: B"}</span>
          <div className="mcq-explanation">{"Continuous functions preserve limits under composition on their common domain."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="limits-p2" data-q="4" data-answer="A" data-difficulty="medium">
        <div className="mcq-q-row">
          <div className="mcq-num">{"4"}</div>
          <div className="mcq-q-text">{"(Medium) If $f$ is a polynomial, then on $\\mathbb{R}^2$ it is:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Continuous everywhere"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"Continuous only at $(0,0)$"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"Discontinuous on axes"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"Continuous only on open disks"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: A"}</span>
          <div className="mcq-explanation">{"Polynomials (and rational functions away from zeros of the denominator) are continuous."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="limits-p2" data-q="5" data-answer="D" data-difficulty="hard">
        <div className="mcq-q-row">
          <div className="mcq-num">{"5"}</div>
          <div className="mcq-q-text">{"(Hard) Removable discontinuity at $(a,b)$ means:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Every path limit fails"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"$f$ blows up near $(a,b)$"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"Partial derivatives fail to exist"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"The limit exists, but $f(a,b)$ is missing or wrong — redefine $f(a,b)$ to fix it"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: D"}</span>
          <div className="mcq-explanation">{"Removable means lim $f$ exists; continuity is restored by setting $f(a,b)$ equal to that limit."}</div>
        </div>
      </div>
    </section>
  );
}

function GuideFooter() {
  return (
    <div className="pg-foot">
      <p>{"End of Limits & Continuity guide."}</p>
    </div>
  );
}

function LimitsContent({ part }) {
  if (part === 1) {
    return (
      <>
        <GuideSidebarPart1 />
        <main className="main">
          <GuideHeaderPart1 />
          <TableOfContentsPart1 />
          <Divider />
          <SectionLC1 />
          <Divider />
          <SectionLC2 />
          <Divider />
          <SectionLC3 />
          <Divider />
          <SectionLCEnrichment />
          <Divider />
          <LimitsExtendedPart1 />
          <Divider />
          <LimitsQuiz part={1} />
          <GuideFooter />
        </main>
      </>
    );
  }

  return (
    <>
      <GuideSidebarPart2 />
      <main className="main">
        <GuideHeaderPart2 />
        <TableOfContentsPart2 />
        <Divider />
        <SectionLC4 />
        <Divider />
        <SectionLC5 />
        <Divider />
        <SectionLCEnrichment />
        <Divider />
        <LimitsExtendedPart2 />
        <Divider />
        <LimitsQuiz part={2} />
        <GuideFooter />
      </main>
    </>
  );
}

function LimitsGuide({ part }) {
  return (
    <StudyGuideShell guideClass="partial-derivatives-guide">
      <LimitsContent part={part} />
    </StudyGuideShell>
  );
}

export default LimitsGuide;