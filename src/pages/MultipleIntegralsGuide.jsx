import StudyGuideShell from "./StudyGuideShell";
import "./PartialDerivativesGuide.css";
import {
  IntegralsExtendedPart1,
  IntegralsExtendedPart2,
} from "./GuideExtendedMaterials";

function Divider() {
  return <hr className="divider" />;
}

function GuideSidebarPart1() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Multiple Integrals · Part 1"}</div>
      </div>
      <a className="sb-link" href="#mi-1">{"Double Integrals"}</a>
      <a className="sb-link" href="#mi-2">{"Fubini's Theorem"}</a>
      <a className="sb-link" href="#mi-3">{"Changing Order"}</a>
      <a className="sb-link" href="#mi-quiz1">{"Practice Quiz"}</a>
    </nav>
  );
}

function GuideSidebarPart2() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Multiple Integrals · Part 2"}</div>
      </div>
      <a className="sb-link" href="#mi-4">{"Triple Integrals"}</a>
      <a className="sb-link" href="#mi-5">{"Polar Coordinates"}</a>
      <a className="sb-link" href="#mi-6">{"Cylindrical Coordinates"}</a>
      <a className="sb-link" href="#mi-quiz2">{"Practice Quiz"}</a>
    </nav>
  );
}

function GuideHeaderPart1() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 1 OF 2"}</p>
      <h1 className="ch-title">{"Multiple Integrals"}</h1>
      <p className="ch-sub">{"Double Integrals, Fubini's Theorem & Changing Order of Integration"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function GuideHeaderPart2() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 2 OF 2"}</p>
      <h1 className="ch-title">{"Triple Integrals & Coordinate Systems"}</h1>
      <p className="ch-sub">{"Triple Integrals, Polar, Cylindrical & Spherical Coordinates"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function TableOfContentsPart1() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 1 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#mi-1">{"Double Integrals"}</a>
        <a className="toc-a" href="#mi-2">{"Fubini's Theorem"}</a>
        <a className="toc-a" href="#mi-3">{"Changing Order of Integration"}</a>
        <a className="toc-a" href="#mi-quiz1">{"Practice Quiz"}</a>
      </div>
    </div>
  );
}

function TableOfContentsPart2() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 2 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#mi-4">{"Triple Integrals"}</a>
        <a className="toc-a" href="#mi-5">{"Polar Coordinates"}</a>
        <a className="toc-a" href="#mi-6">{"Cylindrical Coordinates"}</a>
        <a className="toc-a" href="#mi-quiz2">{"Practice Quiz"}</a>
      </div>
    </div>
  );
}

function SectionMI1() {
  return (
    <section className="section" id="mi-1">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Double Integrals over Rectangles"}</h2>
      <p>
        {"A double integral extends single-variable integration to functions of two variables. Over a rectangle $R = [a,b] \\times [c,d]$, we integrate $f(x,y)$ over both variables."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Double Integral"}</div>
        <p>
          {"The double integral of $f$ over rectangle $R$ is:"}
        </p>
        <div className="fml">
          {"$$\\iint_R f(x,y)\\,dA = \\lim_{m,n\\to\\infty} \\sum_{i=1}^{m}\\sum_{j=1}^{n} f(x_{ij}^*, y_{ij}^*)\\,\\Delta A$$"}
        </div>
        <p>
          {"where $\\Delta A = \\Delta x\\,\\Delta y$ is the area of each small rectangle."}
        </p>
      </div>
      <h3 className="subsec">{"Geometric Interpretation"}</h3>
      <p>
        {"If $f(x,y) \\geq 0$, the double integral $\\iint_R f(x,y)\\,dA$ represents the volume of the solid that lies above the rectangle $R$ and below the surface $z = f(x,y)$."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Estimate $\\iint_R (x+2y)\\,dA$ over $R=[0,2]\\times[0,1]$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Using midpoints: $\\Delta x = 1$, $\\Delta y = 0.5$."}</p>
          <p>{"Sample points: $(0.5, 0.25)$, $(0.5, 0.75)$, $(1.5, 0.25)$, $(1.5, 0.75)$."}</p>
          <p>{"$f(0.5,0.25)=1$, $f(0.5,0.75)=2$, $f(1.5,0.25)=2$, $f(1.5,0.75)=3$."}</p>
          <div className="fml">{"$$\\iint_R f\\,dA \\approx (1+2+2+3)\\times 0.5 = 4$$"}</div>
        </div>
      </div>
    </section>
  );
}

function SectionMI2() {
  return (
    <section className="section" id="mi-2">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Fubini's Theorem"}</h2>
      <p>
        {"Fubini's Theorem allows us to evaluate double integrals as iterated (repeated) single integrals, which is the practical method used in all calculations."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Theorem \u2014 Fubini's Theorem"}</div>
        <p>{"If $f$ is continuous on $R = [a,b]\\times[c,d]$, then:"}</p>
        <div className="fml">
          {"$$\\iint_R f(x,y)\\,dA = \\int_a^b\\int_c^d f(x,y)\\,dy\\,dx = \\int_c^d\\int_a^b f(x,y)\\,dx\\,dy$$"}
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\iint_R (x^2 + 2xy)\\,dA$ where $R = [0,1]\\times[0,2]$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Integrate with respect to $y$ first, then $x$:"}</p>
          <div className="fml">
            {"$$\\int_0^1\\int_0^2 (x^2+2xy)\\,dy\\,dx = \\int_0^1\\left[x^2 y + xy^2\\right]_0^2 dx$$"}
          </div>
          <div className="fml">
            {"$$= \\int_0^1 (2x^2 + 4x)\\,dx = \\left[\\frac{2x^3}{3} + 2x^2\\right]_0^1 = \\frac{2}{3} + 2 = \\frac{8}{3}$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI3() {
  return (
    <section className="section" id="mi-3">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Changing the Order of Integration"}</h2>
      <p>
        {"Sometimes an integral is impossible or very hard in one order but straightforward in the other. Switching the order requires redrawing the region of integration."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Change the order: $\\int_0^1\\int_x^1 e^{y^2}\\,dy\\,dx$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Original region: $0 \\leq x \\leq 1$, $x \\leq y \\leq 1$."}</p>
          <p>{"Redescribed: $0 \\leq y \\leq 1$, $0 \\leq x \\leq y$."}</p>
          <div className="fml">
            {"$$\\int_0^1\\int_0^y e^{y^2}\\,dx\\,dy = \\int_0^1 y\\,e^{y^2}\\,dy = \\frac{1}{2}(e-1)$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI4() {
  return (
    <section className="section" id="mi-4">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Triple Integrals"}</h2>
      <p>
        {"Triple integrals extend double integrals to functions of three variables over a 3D region $E$."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Triple Integral"}</div>
        <div className="fml">
          {"$$\\iiint_E f(x,y,z)\\,dV = \\int_a^b\\int_{g_1(x)}^{g_2(x)}\\int_{h_1(x,y)}^{h_2(x,y)} f(x,y,z)\\,dz\\,dy\\,dx$$"}
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\iiint_E xyz\\,dV$ where $E=[0,1]\\times[0,2]\\times[0,3]$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <div className="fml">
            {"$$\\int_0^1\\int_0^2\\int_0^3 xyz\\,dz\\,dy\\,dx = \\int_0^1 x\\,dx\\cdot\\int_0^2 y\\,dy\\cdot\\int_0^3 z\\,dz$$"}
          </div>
          <div className="fml">
            {"$$= \\frac{1}{2}\\cdot 2\\cdot\\frac{9}{2} = \\frac{9}{2}$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI5() {
  return (
    <section className="section" id="mi-5">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Double Integrals in Polar Coordinates"}</h2>
      <p>
        {"When the region or integrand involves $x^2+y^2$, polar coordinates simplify the integral greatly."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Polar Substitution"}</div>
        <p>{"Let $x = r\\cos\\theta$, $y = r\\sin\\theta$. Then:"}</p>
        <div className="fml">
          {"$$\\iint_R f(x,y)\\,dA = \\int_\\alpha^\\beta\\int_a^b f(r\\cos\\theta, r\\sin\\theta)\\,r\\,dr\\,d\\theta$$"}
        </div>
        <p>{"Note the extra factor of $r$ — this comes from the Jacobian."}</p>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\iint_R \\sqrt{x^2+y^2}\\,dA$ over the disk $x^2+y^2 \\leq 4$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"In polar: $\\sqrt{x^2+y^2} = r$, region is $0\\leq r\\leq 2$, $0\\leq\\theta\\leq 2\\pi$."}</p>
          <div className="fml">
            {"$$\\int_0^{2\\pi}\\int_0^2 r\\cdot r\\,dr\\,d\\theta = 2\\pi\\cdot\\frac{8}{3} = \\frac{16\\pi}{3}$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI6() {
  return (
    <section className="section" id="mi-6">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Cylindrical Coordinates"}</h2>
      <p>
        {"Cylindrical coordinates combine polar coordinates in $xy$ with the $z$-axis: $(r, \\theta, z)$ where $x=r\\cos\\theta$, $y=r\\sin\\theta$, $z=z$."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Triple Integral in Cylindrical Coordinates"}</div>
        <div className="fml">
          {"$$\\iiint_E f\\,dV = \\int_\\alpha^\\beta\\int_a^b\\int_{u_1}^{u_2} f(r\\cos\\theta,r\\sin\\theta,z)\\,r\\,dz\\,dr\\,d\\theta$$"}
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Find the volume of the cylinder $x^2+y^2 \\leq 4$, $0\\leq z\\leq 3$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <div className="fml">
            {"$$\\int_0^{2\\pi}\\int_0^2\\int_0^3 r\\,dz\\,dr\\,d\\theta = 2\\pi\\cdot 2\\cdot 3 = 12\\pi$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMIEnrichment() {
  return (
    <section className="section" id="mi-enrich">
      <div className="sec-badge">{"Deeper Dive"}</div>
      <h2 className="sec-title">{"Order Changes and Jacobians"}</h2>
      <p>
        {"Redrawing $R$ is mandatory before flipping $dx\\,dy$ order. Coordinate changes (polar, cylindrical) add a Jacobian absolute value and rewrite both integrand and limits."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>{"Fubini needs the integral of $|f|$ finite (or continuous on a closed bounded rectangle). Polar contributes the factor $r$ because area elements grow with radius."}</p>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"Area of unit disk via polar."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$\\int_0^{2\\pi}\\int_0^1 r\\,dr\\,d\\theta = 2\\pi\\cdot\\tfrac{1}{2}=\\pi$."}</p>
        </div>
      </div>
    </section>
  );
}

function IntegralsQuiz({ part }) {
  if (part === 1) {
    return (
      <section className="mcq-section" id="mi-quiz1">
        <div className="mcq-section-head">
          <span className="mcq-section-badge">{"Practice"}</span>
          <h2 className="mcq-section-title">{"Part 1 Quiz"}</h2>
        </div>
        <div className="mcq-score-strip">
          <span className="score-lbl">{"Score"}</span>
          <span className="score-val" id="scoreintegrals-p1">{"0 / 5"}</span>
          <span className="score-lbl" style={{ marginLeft: "auto", opacity: "0.4" }}>
            {"Click an option then reveal answer"}
          </span>
        </div>

        <div className="mcq-card" data-section="integrals-p1" data-q="1" data-answer="B">
          <div className="mcq-q-row">
            <div className="mcq-num">{"1"}</div>
            <div className="mcq-q-text">{"What does a double integral represent geometrically when $f(x,y)\\ge 0$?"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"The area of the region $R$."}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"The volume under the surface $z=f(x,y)$ above $R$."}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"The surface area of $z=f(x,y)$."}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"The perimeter of the region $R$."}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: B"}</span>
            <div className="mcq-explanation">{"$\\iint_R f\\,dA$ measures signed volume under $z=f$ when $f\\ge 0$."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="integrals-p1" data-q="2" data-answer="C">
          <div className="mcq-q-row">
            <div className="mcq-num">{"2"}</div>
            <div className="mcq-q-text">{"Fubini's Theorem says we can evaluate a double integral as:"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"A single integral only."}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"Two separate single integrals multiplied together."}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"An iterated integral in either order."}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"A limit of a sum only."}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: C"}</span>
            <div className="mcq-explanation">{"Under suitable conditions, $\\iint_R f = \\int\\!\\int f\\,dy\\,dx = \\int\\!\\int f\\,dx\\,dy$."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="integrals-p1" data-q="3" data-answer="B">
          <div className="mcq-q-row">
            <div className="mcq-num">{"3"}</div>
            <div className="mcq-q-text">{"To change the order of integration, you must:"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Change the function $f(x,y)$."}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"Redraw and redescribe the region of integration."}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"Multiply by a Jacobian factor."}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"Convert to polar coordinates."}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: B"}</span>
            <div className="mcq-explanation">{"New bounds must describe the same region with the reversed inner/outer variables."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="integrals-p1" data-q="4" data-answer="A" data-difficulty="medium">
          <div className="mcq-q-row">
            <div className="mcq-num">{"4"}</div>
            <div className="mcq-q-text">{"(Medium) $\\int_0^1\\int_0^{1-x} 1\\,dy\\,dx$ equals the area of:"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"The triangle with vertices $(0,0)$, $(1,0)$, $(0,1)$"}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"The unit square"}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"A disk of radius 1"}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"An infinite strip"}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: A"}</span>
            <div className="mcq-explanation">{"For each $x\\in[0,1]$, $y$ runs from 0 to $1-x$, the triangle under the line $x+y=1$."}</div>
          </div>
        </div>

        <div className="mcq-card" data-section="integrals-p1" data-q="5" data-answer="C" data-difficulty="hard">
          <div className="mcq-q-row">
            <div className="mcq-num">{"5"}</div>
            <div className="mcq-q-text">{"(Hard) If $R$ is Type I but not Type II, changing order:"}</div>
          </div>
          <div className="mcq-options">
            <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Is always illegal"}</div>
            <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"Requires switching $f$ to $-f$"}</div>
            <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"May require splitting $R$ into several Type II pieces"}</div>
            <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"Always keeps a single pair of bounds"}</div>
          </div>
          <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
          <div className="mcq-answer">
            <span className="mcq-correct-badge">{"Correct Option: C"}</span>
            <div className="mcq-explanation">{"Regions that are Type I but not Type II often need to be split so each piece has $x$ bounds as functions of $y$."}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mcq-section" id="mi-quiz2">
      <div className="mcq-section-head">
        <span className="mcq-section-badge">{"Practice"}</span>
        <h2 className="mcq-section-title">{"Part 2 Quiz"}</h2>
      </div>
      <div className="mcq-score-strip">
        <span className="score-lbl">{"Score"}</span>
        <span className="score-val" id="scoreintegrals-p2">{"0 / 5"}</span>
        <span className="score-lbl" style={{ marginLeft: "auto", opacity: "0.4" }}>
          {"Click an option then reveal answer"}
        </span>
      </div>

      <div className="mcq-card" data-section="integrals-p2" data-q="1" data-answer="B">
        <div className="mcq-q-row">
          <div className="mcq-num">{"1"}</div>
          <div className="mcq-q-text">{"When converting to polar coordinates, $dA$ becomes:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"$dr\\,d\\theta$"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"$r\\,dr\\,d\\theta$"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$r^2\\,dr\\,d\\theta$"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"$d\\theta\\,dr$"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: B"}</span>
          <div className="mcq-explanation">{"The Jacobian of polar coordinates contributes the extra factor $r$."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="integrals-p2" data-q="2" data-answer="B">
        <div className="mcq-q-row">
          <div className="mcq-num">{"2"}</div>
          <div className="mcq-q-text">{"Cylindrical coordinates are best when the region has:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Rectangular symmetry"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"Symmetry about the $z$-axis"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"Symmetry about the $x$-axis"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"No particular symmetry"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: B"}</span>
          <div className="mcq-explanation">{"Cylindrical = polar in $xy$ plus $z$, ideal for rotational symmetry about $z$."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="integrals-p2" data-q="3" data-answer="B">
        <div className="mcq-q-row">
          <div className="mcq-num">{"3"}</div>
          <div className="mcq-q-text">{"Volume of a solid $E$ by a triple integral is:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"$\\iiint_E (x+y+z)\\,dV$"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"$\\iiint_E 1\\,dV$"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$\\iiint_E 0\\,dV$"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"$\\iint f(x,y)\\,dA$ always"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: B"}</span>
          <div className="mcq-explanation">{"Volume is the triple integral of the constant density $1$ over $E$."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="integrals-p2" data-q="4" data-answer="A" data-difficulty="medium">
        <div className="mcq-q-row">
          <div className="mcq-num">{"4"}</div>
          <div className="mcq-q-text">{"(Medium) Disk $x^2+y^2\\le 4$ in polar is:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"$0\\le r\\le 2$, $0\\le\\theta\\le 2\\pi$"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"$0\\le r\\le 4$, $0\\le\\theta\\le\\pi$"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$-2\\le r\\le 2$, $0\\le\\theta\\le\\pi$"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"$1\\le r\\le 2$, $0\\le\\theta\\le 2\\pi$"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: A"}</span>
          <div className="mcq-explanation">{"Radius 2 disk: $r$ from 0 to 2 and a full turn in $\\theta$."}</div>
        </div>
      </div>

      <div className="mcq-card" data-section="integrals-p2" data-q="5" data-answer="D" data-difficulty="hard">
        <div className="mcq-q-row">
          <div className="mcq-num">{"5"}</div>
          <div className="mcq-q-text">{"(Hard) In cylindrical coordinates, $dV$ includes:"}</div>
        </div>
        <div className="mcq-options">
          <div className="mcq-opt" data-opt="A"><span className="mcq-opt-letter">{"A"}</span>{"Only $dz\\,dr\\,d\\theta$"}</div>
          <div className="mcq-opt" data-opt="B"><span className="mcq-opt-letter">{"B"}</span>{"$\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$"}</div>
          <div className="mcq-opt" data-opt="C"><span className="mcq-opt-letter">{"C"}</span>{"$dx\\,dy\\,dz$ unchanged"}</div>
          <div className="mcq-opt" data-opt="D"><span className="mcq-opt-letter">{"D"}</span>{"The factor $r$: $r\\,dz\\,dr\\,d\\theta$"}</div>
        </div>
        <button type="button" className="mcq-reveal-btn">{"Reveal Answer"}</button>
        <div className="mcq-answer">
          <span className="mcq-correct-badge">{"Correct Option: D"}</span>
          <div className="mcq-explanation">{"Cylindrical volume element is $r\\,dz\\,dr\\,d\\theta$ (polar area times $dz$)."}</div>
        </div>
      </div>
    </section>
  );
}

function GuideFooter() {
  return (
    <div className="pg-foot">
      <p>{"End of Multiple Integrals guide."}</p>
    </div>
  );
}

function IntegralsContent({ part }) {
  if (part === 1) {
    return (
      <>
        <GuideSidebarPart1 />
        <main className="main">
          <GuideHeaderPart1 />
          <TableOfContentsPart1 />
          <Divider />
          <SectionMI1 />
          <Divider />
          <SectionMI2 />
          <Divider />
          <SectionMI3 />
          <Divider />
          <SectionMIEnrichment />
          <Divider />
          <IntegralsExtendedPart1 />
          <Divider />
          <IntegralsQuiz part={1} />
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
        <SectionMI4 />
        <Divider />
        <SectionMI5 />
        <Divider />
        <SectionMI6 />
        <Divider />
        <SectionMIEnrichment />
        <Divider />
        <IntegralsExtendedPart2 />
        <Divider />
        <IntegralsQuiz part={2} />
        <GuideFooter />
      </main>
    </>
  );
}

function MultipleIntegralsGuide({ part }) {
  return (
    <StudyGuideShell guideClass="partial-derivatives-guide">
      <IntegralsContent part={part} />
    </StudyGuideShell>
  );
}

export default MultipleIntegralsGuide;