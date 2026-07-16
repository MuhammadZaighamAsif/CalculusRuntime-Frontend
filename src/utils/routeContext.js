/**
 * routeContext.js — Objective CB-5
 * Reads pathname + maps to topic; full URL is sent with every chat request.
 */

const ROUTE_MAP = [
  { match: /\/partial-derivatives\/2/, topic: "Partial Derivatives Part 2", detail: "higher-order partials, mixed partials, chain rule for multivariable functions" },
  { match: /\/partial-derivatives\/1/, topic: "Partial Derivatives Part 1", detail: "definition of partial derivatives, notation, geometric interpretation" },
  { match: /\/partial-derivatives/, topic: "Partial Derivatives", detail: "partial derivatives and related concepts" },
  { match: /\/vector-calculus\/2/, topic: "Vector Calculus Part 2", detail: "curl, divergence, Stokes theorem, divergence theorem" },
  { match: /\/vector-calculus\/1/, topic: "Vector Calculus Part 1", detail: "vector fields, line integrals, gradient, flux" },
  { match: /\/vector-calculus/, topic: "Vector Calculus", detail: "vector calculus topics" },
  { match: /\/vectorfield/, topic: "Vector Field Visualizer", detail: "visualizing 2D vector fields, direction and magnitude of field vectors" },
  { match: /\/limits-continuity\/2/, topic: "Limits and Continuity Part 2", detail: "continuity of multivariable functions, continuity on regions" },
  { match: /\/limits-continuity\/1/, topic: "Limits and Continuity Part 1", detail: "limits of multivariable functions, path-dependent limits" },
  { match: /\/limits-continuity/, topic: "Limits and Continuity", detail: "limits and continuity for multivariable functions" },
  { match: /\/multiple-integrals\/2/, topic: "Multiple Integrals Part 2", detail: "change of variables, Jacobians, polar, cylindrical and spherical coordinates" },
  { match: /\/multiple-integrals\/1/, topic: "Multiple Integrals Part 1", detail: "double integrals, iterated integrals, Fubini's theorem" },
  { match: /\/multiple-integrals/, topic: "Multiple Integrals", detail: "double and triple integrals" },
  { match: /\/taylor-series\/2/, topic: "Taylor Series Part 2", detail: "multivariable Taylor expansions, quadratic approximation, error estimation" },
  { match: /\/taylor-series\/1/, topic: "Taylor Series Part 1", detail: "Taylor polynomials, series expansion of single-variable functions, convergence" },
  { match: /\/taylor-series/, topic: "Taylor Series", detail: "Taylor and Maclaurin series and approximations" },
  { match: /\/lagrange-multipliers\/2/, topic: "Lagrange Multipliers Part 2", detail: "two-constraint problems, applications of Lagrange multipliers, worked optimization examples" },
  { match: /\/lagrange-multipliers\/1/, topic: "Lagrange Multipliers Part 1", detail: "constrained optimization, gradient alignment condition, single-constraint problems" },
  { match: /\/lagrange-multipliers/, topic: "Lagrange Multipliers", detail: "constrained optimization with Lagrange multipliers" },
  { match: /\/stokes-theorem\/2/, topic: "Stokes' Theorem Part 2", detail: "applying Stokes' theorem, surface orientation, computing circulation via curl" },
  { match: /\/stokes-theorem\/1/, topic: "Stokes' Theorem Part 1", detail: "statement of Stokes' theorem, relating line integrals to surface integrals" },
  { match: /\/stokes-theorem/, topic: "Stokes' Theorem", detail: "Stokes' theorem and its applications" },
  { match: /\/divergence-curl\/2/, topic: "Divergence and Curl Part 2", detail: "divergence theorem, flux across closed surfaces, physical interpretations" },
  { match: /\/divergence-curl\/1/, topic: "Divergence and Curl Part 1", detail: "definitions of divergence and curl, del operator, computing div and curl" },
  { match: /\/divergence-curl/, topic: "Divergence and Curl", detail: "divergence, curl, and the divergence theorem" },
  { match: /\/simple-concepts\/[^/]+/, topic: "Simple Concepts (detail page)", detail: "interactive concept exploration" },
  { match: /\/simple-concepts/, topic: "Simple Concepts", detail: "functions of several variables, level curves, surfaces in 3D" },
  { match: /\/courses\/[^/]+/, topic: "Course Hub", detail: "course overview listing calculus study guides and parts" },
  { match: /\/test/, topic: "Continuity Finder Tool", detail: "testing continuity of multivariable functions" },
  { match: /\/extreme/, topic: "Extreme Value Finder Tool", detail: "critical points, second derivative test, saddle points" },
  { match: /\/volumecalculator/, topic: "Volume Calculator Tool", detail: "volumes using double and triple integrals" },
  { match: /\/(taylorx|derivative-visualizer)/, topic: "Derivative Visualizer Tool", detail: "interactive derivative and Taylor approximation plotting" },
  { match: /\/cheatsheet/, topic: "Formula Cheat Sheet", detail: "key multivariable calculus formulas and identities reference" },
  { match: /\/practice/, topic: "Practice Section", detail: "practice problems across multivariable calculus topics" },
  { match: /\/study-plan/, topic: "Personalized Study Plan", detail: "AI-personalized study plan across calculus topics" },
  { match: /\/leaderboard/, topic: "Leaderboard", detail: "opt-in peer progress comparison and rankings" },
  { match: /\/ai-solver/, topic: "AI Solver", detail: "symbolic computation for calculus problems" },
  { match: /\/dashboard/, topic: "Dashboard", detail: "student progress and saved work" },
  { match: /\/login/, topic: "Login", detail: "account sign-in" },
  { match: /\/signup/, topic: "Sign Up", detail: "account registration" },
  { match: /^\/$/, topic: "Home", detail: "general multivariable calculus overview" },
];

export function getPageUrl() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function getTopicContext(pathname = getPageUrl()) {
  for (const entry of ROUTE_MAP) {
    if (entry.match.test(pathname)) {
      return { topic: entry.topic, detail: entry.detail };
    }
  }
  return { topic: "Multivariable Calculus", detail: "general multivariable calculus topics" };
}

/** Full context string injected into every LLM request */
export function getContextString(pathname = getPageUrl()) {
  const { topic, detail } = getTopicContext(pathname);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = `${origin}${pathname}`;
  return (
    `The student is currently on CalcVoyager page ${pathname} (full URL: ${fullUrl}). ` +
    `Topic: "${topic}". Focus: ${detail}.`
  );
}