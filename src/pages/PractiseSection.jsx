import React, { useState, useEffect } from 'react';

// --- MASTER PROBLEM DATABASE (96 DISTINCT PROBLEM OBJECTS) ---
const PRACTICE_PROBLEMS = [
  // ==========================================
  // TOPIC 1: Lagrange Multipliers (12 Problems)
  // ==========================================
  {
    id: 1, topic: 'Lagrange Multipliers', difficulty: 'Easy',
    question: 'What do the geometric gradient configurations ∇f = λ∇g represent at an extreme point?',
    options: ['The gradients point in perpendicular paths.', 'The level surfaces of f and constraint paths of g lie perfectly tangent.', 'The magnitudes of both vectors are identical.', 'The functions f and g map to the same intercept.'],
    correctAnswer: 1, explanation: 'The condition ∇f = λ∇g implies collinear gradients, indicating that the level sets share a common tangent plane.'
  },
  {
    id: 2, topic: 'Lagrange Multipliers', difficulty: 'Easy',
    question: 'If minimizing a cost function f(x,y) subject to a budget constraint g(x,y) = k, the variable λ physically represents:',
    options: ['The total spent capital.', 'The shadow price or marginal utility of changing k.', 'The geometric variance of f.', 'The global minimum value.'],
    correctAnswer: 1, explanation: 'The multiplier λ denotes ∂f/∂k, tracking how the optimum shifts per unit change in the constraint bound.'
  },
  {
    id: 3, topic: 'Lagrange Multipliers', difficulty: 'Easy',
    question: 'True or False: The Lagrange multiplier method can locate boundary extrema even if the constraint gradient ∇g equals zero.',
    options: ['True, because ∇f dominates the equation.', 'False, because the equation ∇f = λ∇g becomes undefined or invalid when ∇g = 0.', 'True, if the function f is linear.', 'False, because λ must also be zero.'],
    correctAnswer: 1, explanation: 'The Lagrange method requires ∇g ≠ 0 at the extremum because if ∇g = 0, the constraint curve does not form a smooth surface or boundary boundary path.'
  },
  {
    id: 4, topic: 'Lagrange Multipliers', difficulty: 'Easy',
    question: 'When optimizing a function f(x,y,z) with a single constraint g(x,y,z) = 0, how many Lagrange multipliers are introduced?',
    options: ['Zero', 'One', 'Two', 'Three'],
    correctAnswer: 1, explanation: 'Exactly one multiplier (λ) is introduced for each independent constraint equation.'
  },
  {
    id: 5, topic: 'Lagrange Multipliers', difficulty: 'Medium',
    question: 'Find the absolute extremum equations for f(x,y) = xy under the circle restriction x^2 + y^2 = 8.',
    options: ['x = ±2, y = ±2', 'x = 0, y = 0', 'x = ±4, y = ±4', 'x = ±1, y = ±7'],
    correctAnswer: 0, explanation: '∇f = ⟨y, x⟩ and ∇g = ⟨2x, 2y⟩. System y = 2λx, x = 2λy yields x^2 = y^2. Plugging into x^2 + y^2 = 8 gives x = ±2, y = ±2.'
  },
  {
    id: 6, topic: 'Lagrange Multipliers', difficulty: 'Medium',
    question: 'When optimization yields a multiplier value λ = 0, what does this indicate about the system constraint g?',
    options: ['The constraint equation is mathematically invalid.', 'The local optimum of f matches its unconstrained local optimum.', 'The function has no real extrema.', 'The surface gradients are infinite.'],
    correctAnswer: 1, explanation: 'λ = 0 means ∇f = 0, meaning the constraint bounds the function exactly where an unconstrained stationary point already resides.'
  },
  {
    id: 7, topic: 'Lagrange Multipliers', difficulty: 'Medium',
    question: 'Find the maximum value of f(x,y) = x + 2y subject to the elliptic constraint x^2 + 2y^2 = 3.',
    options: ['3', '√3', '6', '3/2'],
    correctAnswer: 0, explanation: '∇f = ⟨1, 2⟩, ∇g = ⟨2x, 4y⟩. Setting 1 = 2λx and 2 = 4yλ gives x = y = 1/(2λ). Substituting into the constraint gives x=1, y=1, so max value is 1 + 2(1) = 3.'
  },
  {
    id: 8, topic: 'Lagrange Multipliers', difficulty: 'Medium',
    question: 'If you optimize f(x,y) over the boundary region x^2 + y^2 ≤ 4, where must you look for potential extreme values?',
    options: ['Only inside the open disk interior.', 'Only along the perimeter boundary line.', 'Both critical points inside the interior and Lagrange candidates along the perimeter.', 'Nowhere, as inequality systems cannot be checked.'],
    correctAnswer: 2, explanation: 'Optimization over a closed region requires checking interior critical points via standard derivatives and boundary points via Lagrange multipliers.'
  },
  {
    id: 9, topic: 'Lagrange Multipliers', difficulty: 'Hard',
    question: 'Maximize f(x,y,z) = xyz restricted across two simultaneous boundaries: x + y + z = 1 and x - y - z = 0.',
    options: ['1 / 16', '1 / 32', '0', '-1 / 32'],
    correctAnswer: 3, explanation: 'Adding constraints gives 2x = 1 → x = 1/2. Then y + z = 1/2 and y - z = 0 → y = 1/4, z = 1/4. Thus f(1/2, 1/4, 1/4) = -1/32.'
  },
  {
    id: 10, topic: 'Lagrange Multipliers', difficulty: 'Hard',
    question: 'Determine the point closest to the origin on the hyperbola plane x^2 + 4xy + y^2 = 9.',
    options: ['(±1, ...)', '(±√3, ±√3)', '(0,0)', '(±3, 0)'],
    correctAnswer: 1, explanation: 'Minimize f = x^2 + y^2. Lagrange setup yields parallel relations showing shortest vectors sit at symmetries x = ±y, identifying coordinates as (±√3, ±√3).'
  },
  {
    id: 11, topic: 'Lagrange Multipliers', difficulty: 'Hard',
    question: 'If optimizing f(x) over an inequality g(x) ≤ k, the Karush-Kuhn-Tucker (KKT) conditions enforce that λg(x) must equal:',
    options: ['k', '1', '0', 'λ^2'],
    correctAnswer: 2, explanation: 'Complementary slackness demands λ(g(x) - k) = 0. If the constraint is inactive, λ must fall to zero.'
  },
  {
    id: 12, topic: 'Lagrange Multipliers', difficulty: 'Hard',
    question: 'Find the minimum distance from the origin to the plane x + 2y + 2z = 9 using multipliers.',
    options: ['3', '9', '√3', '1'],
    correctAnswer: 0, explanation: 'Minimize f = x^2 + y^2 + z^2 subject to x+2y+2z=9. Gradients yield 2x=λ, 2y=2λ, 2z=2λ, giving x=1, y=2, z=2. Distance is √(1+4+4) = 3.'
  },

  // ==========================================
  // TOPIC 2: Divergence & Curl (12 Problems)
  // ==========================================
  {
    id: 13, topic: 'Divergence & Curl', difficulty: 'Easy',
    question: 'If a vector field satisfies div(F) > 0 at a specific point, that spatial point acts as a:',
    options: ['Sink', 'Source', 'Vortex', 'Saddle Point'],
    correctAnswer: 1, explanation: 'Positive divergence means net fluid expansion outwards, designating the node as a source.'
  },
  {
    id: 14, topic: 'Divergence & Curl', difficulty: 'Easy',
    question: 'Identify the identity value for the operation: div(curl F) across any smooth field function.',
    options: ['1', '0', 'Infinitely variable', '-1'],
    correctAnswer: 1, explanation: 'The divergence of a curl is always zero (∇ · (∇ × F) = 0) due to equality of mixed partial derivatives.'
  },
  {
    id: 15, topic: 'Divergence & Curl', difficulty: 'Easy',
    question: 'If curl(F) = 0 everywhere within a simply connected open domain, the vector field F is classified as:',
    options: ['Solenoidal', 'Irrotational (Conservative)', 'Incompressible', 'Rotational'],
    correctAnswer: 1, explanation: 'A field with zero curl is irrotational. On simply connected domains, this implies it is a conservative gradient field.'
  },
  {
    id: 16, topic: 'Divergence & Curl', difficulty: 'Easy',
    question: 'What mathematical operator represents the geometric notation ∇ × F?',
    options: ['Divergence scalar product', 'Curl vector product', 'Gradient field', 'Laplacian operator'],
    correctAnswer: 1, explanation: 'The cross product of the del operator with a vector field defines the curl.'
  },
  {
    id: 17, topic: 'Divergence & Curl', difficulty: 'Medium',
    question: 'Compute the curl configuration of the steady vector field matrix F = ⟨-y, x, z⟩.',
    options: ['⟨0, 0, 0⟩', '⟨0, 0, 2⟩', '⟨1, 1, 1⟩', '⟨-x, y, 0⟩'],
    correctAnswer: 1, explanation: 'Evaluating the determinant variant gives (∂/∂x(x) - ∂/∂y(-y))k = (1 - (-1))k = 2k.'
  },
  {
    id: 18, topic: 'Divergence & Curl', difficulty: 'Medium',
    question: 'Compute the scalar divergence of the variable field system F = ⟨x^2, y^2, z^2⟩ at the coordinate (1, 2, 3).',
    options: ['6', '12', '14', '0'],
    correctAnswer: 1, explanation: 'div(F) = 2x + 2y + 2z. Evaluating at (1,2,3) yields 2(1) + 2(2) + 2(3) = 12.'
  },
  {
    id: 19, topic: 'Divergence & Curl', difficulty: 'Medium',
    question: 'Calculate the divergence of F = ⟨sin(x), cos(y), z^2⟩.',
    options: ['cos(x) - sin(y) + 2z', 'cos(x) + sin(y) + z', '0', '-cos(x) + sin(y)'],
    correctAnswer: 0, explanation: 'div(F) = ∂/∂x(sin x) + ∂/∂y(cos y) + ∂/∂z(z^2) = cos(x) - sin(y) + 2z.'
  },
  {
    id: 20, topic: 'Divergence & Curl', difficulty: 'Medium',
    question: 'What is the physical meaning of curl F at a specific location in a fluid flow field?',
    options: ['The rate of fluid expansion.', 'The rotation vector of a tiny paddle wheel placed at that point.', 'The total mass flow rate through a surface.', 'The rate of fluid compression.'],
    correctAnswer: 1, explanation: 'Curl measures the local rotation or angular velocity of the field vectors about that point.'
  },
  {
    id: 21, topic: 'Divergence & Curl', difficulty: 'Hard',
    question: 'An irrotational, incompressible vector field must satisfy which differential statement?',
    options: ['∇ × F = 0 and ∇ · F = 0', '∇ × F = 1', 'It forms a zero Laplacian scalar field only', 'Its line integral path is always infinite'],
    correctAnswer: 0, explanation: 'Irrotational implies curl is zero; incompressible implies divergence is zero.'
  },
  {
    id: 22, topic: 'Divergence & Curl', difficulty: 'Hard',
    question: 'Evaluate the curl of the gradient of any smooth multivariable scalar field ∇ × (∇f).',
    options: ['∇^2 f', '0', '1', 'Vector field f status'],
    correctAnswer: 1, explanation: 'The curl of any gradient field is identically zero vector due to mixed partials matching.'
  },
  {
    id: 23, topic: 'Divergence & Curl', difficulty: 'Hard',
    question: 'If F = ⟨x/r^3, y/r^3, z/r^3⟩ where r = √(x^2+y^2+z^2), evaluate div(F) everywhere except the origin.',
    options: ['3/r^2', '0', '-3/r^4', '1/r'],
    correctAnswer: 1, explanation: 'This is an inverse-square law field. Working out the partials shows div(F) = 0 for all points where r > 0.'
  },
  {
    id: 24, topic: 'Divergence & Curl', difficulty: 'Hard',
    question: 'Compute curl(F) for the complex field layout F = ⟨yz, xz, xy⟩.',
    options: ['⟨x, y, z⟩', '⟨0, 0, 0⟩', '⟨z, x, y⟩', '⟨1, 1, 1⟩'],
    correctAnswer: 1, explanation: 'Computing partial combinations yields: ⟨x-x, y-y, z-z⟩ = ⟨0,0,0⟩. (F is a conservative field derived from f = xyz).'
  },

  // ==========================================
  // TOPIC 3: Stokes' Theorem (12 Problems)
  // ==========================================
  {
    id: 25, topic: "Stokes' Theorem", difficulty: 'Easy',
    question: "Stokes' Theorem creates a structural bridge relating which two types of integrals?",
    options: ['Line integrals and surface integrals', 'Line integrals and volume integrals', 'Double integrals and triple integrals', 'Flux integrals and divergence vectors'],
    correctAnswer: 0, explanation: 'Stokes\' Theorem equates a line integral around a closed boundary loop to a surface integral of the curl over that bounded surface.'
  },
  {
    id: 26, topic: "Stokes' Theorem", difficulty: 'Easy',
    question: 'If the bounding loop C changes its tracking direction from counter-clockwise to clockwise, the surface curl integral:',
    options: ['Flips signs (multiplies by -1)', 'Drops immediately to zero', 'Remains entirely unaffected', 'Becomes imaginary'],
    correctAnswer: 0, explanation: 'Reversing boundary orientation flips the tangent vector direction, changing the sign of the integral.'
  },
  {
    id: 27, topic: "Stokes' Theorem", difficulty: 'Easy',
    question: 'Stokes\' Theorem can be considered a higher-dimensional generalization of which theorem?',
    options: ['Divergence Theorem', 'Green\'s Theorem in the plane', 'Mean Value Theorem', 'Fubini\'s Theorem'],
    correctAnswer: 1, explanation: 'Green\'s Theorem is exactly Stokes\' Theorem restricted to a flat, 2D planar region.'
  },
  {
    id: 28, topic: "Stokes' Theorem", difficulty: 'Easy',
    question: 'For Stokes\' Theorem to apply, the boundary curve C must be:',
    options: ['Open and linear', 'Closed and piecewise smooth', 'Infinite', 'Perfect square geometry'],
    correctAnswer: 1, explanation: 'The boundary must form a closed loop path to encapsulate the integrated surface area.'
  },
  {
    id: 29, topic: "Stokes' Theorem", difficulty: 'Medium',
    question: "Evaluate ∮ F · dr around a closed path where curl(F) = ⟨0, 0, 5⟩ and the flat interior region surface area is 3.",
    options: ['0', '15', '5/3', '45'],
    correctAnswer: 1, explanation: '∫∫ (curl F) · n dS = ∫∫ 5 dA = 5 * Area = 5 * 3 = 15.'
  },
  {
    id: 30, topic: "Stokes' Theorem", difficulty: 'Medium',
    question: 'Why can multiple different open surfaces yield the identical output value under Stokes\' evaluation?',
    options: ['Because the area of the surfaces is identical.', 'Because they share the exact same bounding closed boundary curve C.', 'Because the vector field is conservative.', 'Because all surfaces are inherently flat.'],
    correctAnswer: 1, explanation: 'The surface integral depends only on the values along the boundary curve C.'
  },
  {
    id: 31, topic: "Stokes' Theorem", difficulty: 'Medium',
    question: 'If a vector field F is conservative throughout space, what is the value of ∮ F · dr along any closed loop using Stokes\' Theorem?',
    options: ['Always zero', 'Dependent on loop area', 'Always positive', 'Undefined'],
    correctAnswer: 0, explanation: 'Conservative fields have curl F = 0 everywhere, making the surface integral of the curl evaluate to zero.'
  },
  {
    id: 32, topic: "Stokes' Theorem", difficulty: 'Medium',
    question: 'Suppose a surface S is a hemisphere with a base circle boundary C. According to the right-hand rule, if C is oriented counterclockwise in the xy-plane, the normal vectors to S point:',
    options: ['Inward/Downward', 'Outward/Upward', 'Tangential to the perimeter', 'Directly along the x-axis'],
    correctAnswer: 1, explanation: 'Curling your fingers along the counterclockwise path assigns the normal vector upward/outward via right-hand coordination.'
  },
  {
    id: 33, topic: "Stokes' Theorem", difficulty: 'Hard',
    question: "Calculate ∮ F · dr for F = ⟨-y^3, x^3, z^3⟩ around the cylinder intersection path x^2 + y^2 = 1, z = 5.",
    options: ['0', '3/2 π', '3π', '3/4 π'],
    correctAnswer: 1, explanation: 'Curl F = ⟨0, 0, 3x^2 + 3y^2⟩. Normal vector is ⟨0,0,1⟩. Double integral of 3(x^2+y^2) over the unit disk in polar coordinates yields 3/2 * π.'
  },
  {
    id: 34, topic: "Stokes' Theorem", difficulty: 'Hard',
    question: 'If surface boundary curve C forms a single point (shrunk to zero limits), the value of the curl surface integral is:',
    options: ['Undefined', '0', 'Infinity', 'Dependent on the field volume'],
    correctAnswer: 1, explanation: 'A closed loop shrunk to a single point forms an empty integration path boundary, dropping the total integration value to 0.'
  },
  {
    id: 35, topic: "Stokes' Theorem", difficulty: 'Hard',
    question: "Evaluate ∮ F · dr where F = ⟨z, x, y⟩ around a triangle with vertices (1,0,0), (0,1,0), (0,0,1) oriented counter-clockwise.",
    options: ['3', '3/2', '0', '-3/2'],
    correctAnswer: 1, explanation: 'Curl F = ⟨1, 1, 1⟩. The normal vector to the plane x+y+z=1 is 1/... ⟨1,1,1⟩. Integrating yields a final calculated line loop value of 3/2.'
  },
  {
    id: 36, topic: "Stokes' Theorem", difficulty: 'Hard',
    question: 'Verify the value of ∬ (∇ × F) · dS over a closed sphere surface geometry matching any arbitrary smooth vector field.',
    options: ['Always zero', 'Total interior volume', 'Flux value', '4π'],
    correctAnswer: 0, explanation: 'A closed surface has no boundary curve (it boundary is empty). Therefore, by Stokes\' Theorem, the integral drops cleanly to zero.'
  },

  // ==========================================
  // TOPIC 4: Taylor Series for Multivariable Functions (12 Problems)
  // ==========================================
  {
    id: 37, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Easy',
    question: 'What matrix maps all the first-order partial derivatives inside a multivariable Taylor expansion?',
    options: ['Hessian Matrix', 'Jacobian / Gradient Vector', 'Vandermonde Array', 'Wronskian Determinant'],
    correctAnswer: 1, explanation: 'The first-degree modifications are defined linearly by the gradient vector or Jacobian matrix.'
  },
  {
    id: 38, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Easy',
    question: 'A multivariable Taylor series expanded specifically around the origin point (0,0) is called a:',
    options: ['Fourier Series', 'Maclaurin Series', 'Laurent Series', 'Power Transform'],
    correctAnswer: 1, explanation: 'A Taylor series centered specifically at the origin is classified as a Maclaurin expansion.'
  },
  {
    id: 39, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Easy',
    question: 'In a 2D multivariable function Taylor series, what is the total number of linear operational terms (first-degree terms)?',
    options: ['One', 'Two', 'Three', 'Four'],
    correctAnswer: 1, explanation: 'There are two first-degree terms: one tracking x changes (f_x) and one tracking y changes (f_y).'
  },
  {
    id: 40, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Easy',
    question: 'The zero-order term in the Taylor series expansion of f(x,y) centered at (a,b) is simply:',
    options: ['0', 'f(a,b)', 'f_x(a,b)', '1'],
    correctAnswer: 1, explanation: 'The zero-order base approximation anchor is the raw functional evaluation at the chosen center coordinate point.'
  },
  {
    id: 41, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Medium',
    question: 'Identify the proper coefficient of the mixed term xy in the Taylor expansion of f(x,y) around a center point.',
    options: ['f_xy(a,b)', '1/2 * f_xy(a,b)', '2 * f_xy(a,b)', '1/6 * f_xy(a,b)'],
    correctAnswer: 0, explanation: 'The 2nd degree expansion contains 1/2! * (2 * f_xy * x * y), canceling the fractional half coefficient to leave exactly 1 * f_xy.'
  },
  {
    id: 42, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Medium',
    question: 'What is the second-order Taylor polynomial for f(x,y) = e^(x+y) evaluated around the origin point?',
    options: ['1 + x + y', '1 + x + y + 1/2(x^2 + 2xy + y^2)', '1 + x + y + x^2 + y^2', 'x + y + xy'],
    correctAnswer: 1, explanation: 'All partial derivatives of e^(x+y) evaluated at (0,0) equal 1. Plugging these into the formula yields option 1.'
  },
  {
    id: 43, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Medium',
    question: 'Compute the 1st-degree linear Taylor polynomial approximation of f(x,y) = x^2 + y^2 centered around (1,2).',
    options: ['5 + 2(x-1) + 4(y-2)', '5 + x + 2y', '2(x-1) + 4(y-2)', '1 + 2x + 4y'],
    correctAnswer: 0, explanation: 'f(1,2)=5, f_x=2x→2, f_y=2y→4. The linear formulation maps precisely to: 5 + 2(x-1) + 4(y-2).'
  },
  {
    id: 44, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Medium',
    question: 'If a function has symmetric properties such that f(x,y) = f(-x,-y), its multivariable Maclaurin expansion will contain:',
    options: ['Only odd-degree terms', 'Only even-degree terms', 'Only mixed cross-product terms', 'No terms at all'],
    correctAnswer: 1, explanation: 'Symmetric even parity eliminates odd power sequences within the tracking structural series.'
  },
  {
    id: 45, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Hard',
    question: 'The symmetric square matrix containing all second-order partial derivative combinations is named the:',
    options: ['Jacobian', 'Hessian', 'Gramian', 'Laplacian'],
    correctAnswer: 1, explanation: 'The Hessian matrix holds the second-order partial derivatives and dictates quadratic behavior near critical points.'
  },
  {
    id: 46, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Hard',
    question: 'Find the second-order Taylor approximation for f(x,y) = cos(x)cos(y) around the origin.',
    options: ['1 - 1/2(x^2 + y^2)', '1 + x^2 + y^2', '1 - xy', 'x + y - 1/2(x^2y^2)'],
    correctAnswer: 0, explanation: 'cos(x) ≈ 1 - x^2/2 and cos(y) ≈ 1 - y^2/2. Multiplying and dropping higher order terms yields 1 - 1/2(x^2 + y^2).'
  },
  {
    id: 47, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Hard',
    question: 'If all linear and quadratic terms of a Taylor series vanish at a point, that coordinate point constitutes a:',
    options: ['Saddle point definitively', 'Stationary point where local shape depends on cubic or higher orders', 'Global absolute boundary edge', 'Point of discontinuity'],
    correctAnswer: 1, explanation: 'When first and second derivatives vanish, the local structural curvature is governed by higher-order terms.'
  },
  {
    id: 48, topic: 'Taylor Series for Multivariable Functions', difficulty: 'Hard',
    question: 'What is the coefficient of the x^2 y term in the cubic Taylor expansion of an arbitrary smooth function f(x,y)?',
    options: ['1/2 * f_xxy', '1/6 * f_xxy', 'f_xxy', '3 * f_xxy'],
    correctAnswer: 0, explanation: 'The generalized term formula component is (1/3!) * (3 * f_xxy * x^2 * y), which yields a net fraction multiplier balance of exactly 1/2.'
  },

  // ==========================================
  // TOPIC 5: Partial Derivatives (12 Problems)
  // ==========================================
  {
    id: 49, topic: 'Partial Derivatives', difficulty: 'Easy',
    question: 'When computing the partial derivative ∂f/∂x of a function f(x,y), how is the variable y treated?',
    options: ['As a variable dependent on x.', 'As a constant value.', 'It is completely removed from the expression.', 'It is differentiated normally alongside x.'],
    correctAnswer: 1, explanation: 'Partial differentiation with respect to one variable requires holding all other independent variables completely constant.'
  },
  {
    id: 50, topic: 'Partial Derivatives', difficulty: 'Easy',
    question: 'Find ∂f/∂x for the equation f(x,y) = 3x^2 y + 5y^3.',
    options: ['6xy', '6xy + 15y^2', '6x', '3xy'],
    correctAnswer: 0, explanation: 'Differentiating with respect to x makes 3x^2 y become 6xy, and the 5y^3 constant term drops cleanly to 0.'
  },
  {
    id: 51, topic: 'Partial Derivatives', difficulty: 'Easy',
    question: 'Clairaut\'s Theorem states that if mixed partial derivatives are continuous, then:',
    options: ['f_xx = f_yy', 'f_xy = f_yx', 'f_x = f_y', 'f_xy = 0'],
    correctAnswer: 1, explanation: 'Clairaut\'s Theorem guarantees that the order of partial differentiation does not affect the result if the mixed partials are continuous.'
  },
  {
    id: 52, topic: 'Partial Derivatives', difficulty: 'Easy',
    question: 'The notation f_y evaluates to which directional calculation alternative?',
    options: ['∂f/∂x', '∂f/∂y', '∂^2f/∂y^2', 'df/dy'],
    correctAnswer: 1, explanation: 'The subscript variable shorthand notation directly denotes partial differentiation with respect to that variable.'
  },
  {
    id: 53, topic: 'Partial Derivatives', difficulty: 'Medium',
    question: 'Find the partial derivative with respect to y, ∂f/∂y, of f(x,y) = ln(x^2 + y^2).',
    options: ['2y / (x^2 + y^2)', '1 / (x^2 + y^2)', '2x / (x^2 + y^2)', '2 / y'],
    correctAnswer: 0, explanation: 'Applying the chain rule gives: (1 / (x^2 + y^2)) * ∂/∂y(x^2 + y^2) = 2y / (x^2 + y^2).'
  },
  {
    id: 54, topic: 'Partial Derivatives', difficulty: 'Medium',
    question: 'Compute f_xy for the function f(x,y) = x^3 y^2 + x y.',
    options: ['6x^2 y + 1', '3x^2 * 2y', '6xy', '3x^2 y^2 + 1'],
    correctAnswer: 0, explanation: 'First, f_x = 3x^2 y^2 + y. Differentiating that result with respect to y yields f_xy = 6x^2 y + 1.'
  },
  {
    id: 55, topic: 'Partial Derivatives', difficulty: 'Medium',
    question: 'If z = x^2 y and x = t^2, y = t^3, use the multivariable Chain Rule to compute dz/dt.',
    options: ['7t^6', '7t^7', '6t^5', '5t^4'],
    correctAnswer: 0, explanation: 'dz/dt = (∂z/∂x)(dx/dt) + (∂z/∂y)(dy/dt) = (2xy)(2t) + (x^2)(3t^2) = (2t^7)(2t) + (t^4)(3t^2) = 4t^7 + 3t^6... wait, substituting x and y gives 2(t^2)(t^3)(2t) + (t^4)(3t^2) = 4t^6 + 3t^6 = 7t^6.'
  },
  {
    id: 56, topic: 'Partial Derivatives', difficulty: 'Medium',
    question: 'What vector direction yields the maximum rate of increase for a multivariable scalar function?',
    options: ['The tangent vector to the level curve.', 'The gradient vector ∇f.', 'The negative gradient vector -∇f.', 'The unit vector parallel to the z-axis.'],
    correctAnswer: 1, explanation: 'The gradient vector always points in the direction of steepest ascent for a function.'
  },
  {
    id: 57, topic: 'Partial Derivatives', difficulty: 'Hard',
    question: 'Find the directional derivative of f(x,y) = x^2 y at the point (1,2) in the direction of the vector v = ⟨3, 4⟩.',
    options: ['16/5', '14/5', '16', '22/5'],
    correctAnswer: 0, explanation: '∇f = ⟨2xy, x^2⟩ → at (1,2) is ⟨4, 1⟩. Normalize v to get u = ⟨3/5, 4/5⟩. The directional derivative is ⟨4, 1⟩ · ⟨3/5, 4/5⟩ = 12/5 + 4/5 = 16/5.'
  },
  {
    id: 58, topic: 'Partial Derivatives', difficulty: 'Hard',
    question: 'Calculate the total differential dz for the implicit surface equation x^2 + y^2 + z^2 = 1.',
    options: ['dz = -(xdx + ydy)/z', 'dz = xdx + ydy', 'dz = -z(xdx + ydy)', 'dz = 0'],
    correctAnswer: 0, explanation: 'Differentiating implicitly yields 2xdx + 2ydy + 2zdz = 0. Solving for dz gives: dz = -(xdx + ydy)/z.'
  },
  {
    id: 59, topic: 'Partial Derivatives', difficulty: 'Hard',
    question: 'Compute the second partial derivative f_xx for the function f(x,y) = arctan(y/x).',
    options: ['2xy / (x^2 + y^2)^2', '-2xy / (x^2 + y^2)^2', '1 / (1 + y^2/x^2)', '-y / (x^2 + y^2)'],
    correctAnswer: 0, explanation: 'f_x = (-y/x^2) / (1 + y^2/x^2) = -y / (x^2 + y^2). Differentiating again with respect to x gives f_xx = 2xy / (x^2 + y^2)^2.'
  },
  {
    id: 60, topic: 'Partial Derivatives', difficulty: 'Hard',
    question: 'If a function f(x,y) satisfies Laplace\'s Equation (f_xx + f_yy = 0), the function is classified as:',
    options: ['Analytic', 'Harmonic', 'Conservative', 'Continuous'],
    correctAnswer: 1, explanation: 'Functions that satisfy Laplace\'s equation are called harmonic functions, critical in physics and potential theory.'
  },

  // ==========================================
  // TOPIC 6: Vector Calculus (12 Problems)
  // ==========================================
  {
    id: 61, topic: 'Vector Calculus', difficulty: 'Easy',
    question: 'A vector field F is conservative if it can be written as the gradient of a scalar function f. What is f called?',
    options: ['Vector potential', 'Potential function', 'Conservative scalar', 'Work index'],
    correctAnswer: 1, explanation: 'The scalar function f whose gradient equals F (∇f = F) is called the potential function.'
  },
  {
    id: 62, topic: 'Vector Calculus', difficulty: 'Easy',
    question: 'The fundamental theorem for line integrals states that if F = ∇f, then ∫_C F · dr equals:',
    options: ['0', 'f(r(b)) - f(r(a))', 'f(b) + f(a)', 'The total arc length of path C'],
    correctAnswer: 1, explanation: 'Like the fundamental theorem of calculus, the line integral of a gradient field depends only on the endpoints of the path.'
  },
  {
    id: 63, topic: 'Vector Calculus', difficulty: 'Easy',
    question: 'What represents the integral calculation form ∬_S F · n dS physically?',
    options: ['The total volume bounded by S.', 'The total fluid flux passing through the surface S.', 'The work done along the surface perimeter.', 'The mass distribution scale.'],
    correctAnswer: 1, explanation: 'The surface integral of a vector field measures the net volume of fluid crossing the surface per unit time, known as flux.'
  },
  {
    id: 64, topic: 'Vector Calculus', difficulty: 'Easy',
    question: 'True or False: A path integral with respect to arc length ∫_C f(x,y) ds changes sign if the path orientation is reversed.',
    options: ['True', 'False, because ds is a scalar magnitude segment length that is always positive.', 'True only for vector line integrals.', 'False only if f(x,y) is constant.'],
    correctAnswer: 1, explanation: 'Scalar arc length integration updates are path direction invariant because ds tracks absolute step distance lengths.'
  },
  {
    id: 65, topic: 'Vector Calculus', difficulty: 'Medium',
    question: 'Determine if the vector field F = ⟨2xy, x^2 + 3y^2⟩ is conservative, and find its potential function if it exists.',
    options: ['Not conservative', 'Conservative, f(x,y) = x^2 y + y^3', 'Conservative, f(x,y) = 2x^2 y^2', 'Conservative, f(x,y) = x^3 y + y'],
    correctAnswer: 1, explanation: '∂P/∂y = 2x, ∂Q/∂x = 2x. They match, so it is conservative. Integrating P with respect to x gives x^2 y + g(y). Matching derivatives identifies g(y) = y^3.'
  },
  {
    id: 66, topic: 'Vector Calculus', difficulty: 'Medium',
    question: 'Calculate the line integral ∫_C F · dr for F = ⟨y, -x⟩ along the line segment from (0,0) to (1,1).',
    options: ['0', '1', '-1', '2'],
    correctAnswer: 0, explanation: 'Parametrize: x = t, y = t, dx = dt, dy = dt for t from 0 to 1. Integral becomes ∫ (t*dt - t*dt) = 0.'
  },
  {
    id: 67, topic: 'Vector Calculus', difficulty: 'Medium',
    question: 'The Divergence Theorem changes a closed surface flux integral into what kind of calculation?',
    options: ['A line integral along the boundary.', 'A triple volume integral of the field\'s divergence.', 'A double surface integral of the field\'s curl.', 'A scalar dot product.'],
    correctAnswer: 1, explanation: 'The Divergence Theorem equates the net flux through a closed surface to the triple integral of the divergence over the interior volume.'
  },
  {
    id: 68, topic: 'Vector Calculus', difficulty: 'Medium',
    question: 'Parametrize a standard flat circular disk surface of radius R parallel to the xy-plane at height z = 3.',
    options: ['r(u,v) = ⟨u cos v, u sin v, 3⟩', 'r(u,v) = ⟨u, v, 0⟩', 'r(u,v) = ⟨R cos u, R sin u, v⟩', 'r(u,v) = ⟨u, v, u+v⟩'],
    correctAnswer: 0, explanation: 'Using polar variants, x = u cos(v) and y = u sin(v) with a locked z height index of 3 successfully models the disk area layout.'
  },
  {
    id: 69, topic: 'Vector Calculus', difficulty: 'Hard',
    question: 'Compute the total flux of F = ⟨x, y, z⟩ through the closed unit sphere x^2 + y^2 + z^2 = 1 using the Divergence Theorem.',
    options: ['4π', '4/3 π', '0', '2π'],
    correctAnswer: 0, explanation: 'div(F) = 1 + 1 + 1 = 3. The volume of the unit sphere is 4/3 * π. Flux = 3 * (4/3 * π) = 4π.'
  },
  {
    id: 70, topic: 'Vector Calculus', difficulty: 'Hard',
    question: 'Find the work done by the force field F = ⟨y^2, x^2⟩ moving an object along the top half of the unit circle from (1,0) to (-1,0).',
    options: ['-4/3', '0', '4/3', 'π/2'],
    correctAnswer: 0, explanation: 'Parametrize via polar angles or apply Green\'s Theorem by closing the loop along the x-axis to calculate the path displacement balance.'
  },
  {
    id: 71, topic: 'Vector Calculus', difficulty: 'Hard',
    question: 'Evaluate the surface integral ∬_S ∇ × F · dS over the open upper hemisphere of the unit sphere, where F = ⟨-y, x, 0⟩.',
    options: ['2π', '0', 'π', '-2π'],
    correctAnswer: 0, explanation: 'By Stokes\' Theorem, switch to a line integral over the base boundary circle C (x^2+y^2=1, z=0): ∮ (-y dx + x dy). Using standard unit circle parameters gives ∫_0^2π 1 dt = 2π.'
  },
  {
    id: 72, topic: 'Vector Calculus', difficulty: 'Hard',
    question: 'A vector field G can be written as the curl of another vector field A (G = ∇ × A) if and only if:',
    options: ['curl G = 0', 'div G = 0', 'G is conservative', 'A is unique'],
    correctAnswer: 1, explanation: 'A vector field is solenoidal (has a vector potential A) if and only if its divergence is identically zero.'
  },

  // ==========================================
  // TOPIC 7: Limits and Continuity (12 Problems)
  // ==========================================
  {
    id: 73, topic: 'Limits and Continuity', difficulty: 'Easy',
    question: 'Evaluate the limit: lim (x→3) (x^2 - 4x + 5).',
    options: ['2', '5', '1', '0'],
    correctAnswer: 0, explanation: 'Direct substitution yields: 3^2 - 4(3) + 5 = 9 - 12 + 5 = 2.'
  },
  {
    id: 74, topic: 'Limits and Continuity', difficulty: 'Easy',
    question: 'Under what conditions is direct substitution valid for evaluating a limit lim (x→a) f(x)?',
    options: ['Only when f(x) is a simple polynomial.', 'When f(x) is continuous at x = a.', 'Whenever the value of a is zero.', 'Only when the function is rational.'],
    correctAnswer: 1, explanation: 'By definition, a function is continuous at a point if its limit equals its direct evaluation value.'
  },
  {
    id: 75, topic: 'Limits and Continuity', difficulty: 'Easy',
    question: 'Evaluate the standard indeterminate limit: lim (x→2) (x^2 - 4) / (x - 2).',
    options: ['2', '4', '0', 'Undefined'],
    correctAnswer: 1, explanation: 'Factor the numerator into (x-2)(x+2). Cancel (x-2) to get x+2. Substituting x=2 yields 4.'
  },
  {
    id: 76, topic: 'Limits and Continuity', difficulty: 'Easy',
    question: "Which two specific indeterminate forms allow the direct use of L'Hôpital's Rule?",
    options: ['0/0 and ∞/∞', '0 * ∞ and 1^∞', '∞ - ∞ and 0^0', 'Any undefined form'],
    correctAnswer: 0, explanation: 'L\'Hôpital\'s rule applies directly only to the structural quotients 0/0 and ±∞/±∞.'
  },
  {
    id: 77, topic: 'Limits and Continuity', difficulty: 'Medium',
    question: 'Evaluate the trigonometric limit: lim (x→π/4) (sin^2(x) + cos(x)).',
    options: ['1/2 + √2/2', '1 + √2', '√2', '1'],
    correctAnswer: 0, explanation: 'Substituting yields: (1/√2)^2 + 1/√2 = 1/2 + √2/2.'
  },
  {
    id: 78, topic: 'Limits and Continuity', difficulty: 'Medium',
    question: 'Evaluate the radical limit: lim (x→0) (√(x+1) - 1) / x.',
    options: ['1', '1/2', '0', 'Undefined'],
    correctAnswer: 1, explanation: 'Multiply the top and bottom by the conjugate √(x+1) + 1. The numerator simplifies to x, which cancels with the denominator, leaving 1 / (√(x+1) + 1). Evaluating at x=0 yields 1/2.'
  },
  {
    id: 79, topic: 'Limits and Continuity', difficulty: 'Medium',
    question: "Evaluate the limit: lim (x→0) (e^x - 1 - x) / x^2.",
    options: ['1', '1/2', '0', 'Infinity'],
    correctAnswer: 1, explanation: 'Applying the rule once gives (e^x-1)/(2x) [still 0/0]. Applying it a second time gives e^x/2. Substituting x=0 yields 1/2.'
  },
  {
    id: 80, topic: 'Limits and Continuity', difficulty: 'Medium',
    question: 'Evaluate the limit: lim (x→∞) (3x^2 + 5x) / (2x^2 - 7).',
    options: ['0', '3/2', 'Infinity', '5/-7'],
    correctAnswer: 1, explanation: 'Since the degrees match, the limit equals the ratio of their leading coefficients: 3/2.'
  },
  {
    id: 81, topic: 'Limits and Continuity', difficulty: 'Hard',
    question: 'Evaluate the multivariable limit: lim ((x,y)→(0,0)) (x^2 - y^2) / (x^2 + y^2).',
    options: ['0', '1', 'Does Not Exist', '-1'],
    correctAnswer: 2, explanation: 'Approaching along the x-axis (y=0) gives limit 1. Approaching along the y-axis (x=0) gives limit -1. Since the paths give different results, the limit does not exist.'
  },
  {
    id: 82, topic: 'Limits and Continuity', difficulty: 'Hard',
    question: 'Evaluate the exponential indeterminate form: lim (x→0+) x^x.',
    options: ['0', '1', 'e', 'Undefined'],
    correctAnswer: 1, explanation: 'Let y = x^x, so ln(y) = x ln(x). Using L\'Hôpital on the log transform yields 0, so the exponential evaluates to e^0 = 1.'
  },
  {
    id: 83, topic: 'Limits and Continuity', difficulty: 'Hard',
    question: 'Evaluate the radical infinity framework: lim (x→∞) (√(x^2 + 3x) - x).',
    options: ['0', '3/2', '3', 'Infinity'],
    correctAnswer: 1, explanation: 'Multiply by the conjugate: (x^2 + 3x - x^2) / (√(x^2 + 3x) + x). Dividing top and bottom by x yields 3 / (1 + 1) = 3/2.'
  },
  {
    id: 84, topic: 'Limits and Continuity', difficulty: 'Hard',
    question: 'For a multivariable function f(x,y) to be continuous at (a,b), which statement must hold true?',
    options: ['The limit exists as (x,y)→(a,b).', 'f(a,b) must be defined.', 'The limit as (x,y)→(a,b) must exist and equal f(a,b).', 'The partial derivatives must be zero.'],
    correctAnswer: 2, explanation: 'Continuity requires the function to be defined at that point, the limit to exist, and the limit value to equal the functional definition value.'
  },

  // ==========================================
  // TOPIC 8: Multiple Integrals (12 Problems)
  // ==========================================
  {
    id: 85, topic: 'Multiple Integrals', difficulty: 'Easy',
    question: 'Fubini\'s Theorem states that for a continuous function f(x,y) over a rectangle, the iterated integrals are:',
    options: ['Always zero.', 'Equal regardless of the order of integration.', 'Dependent on grid area sizing.', 'Different depending on whether dx or dy is integrated first.'],
    correctAnswer: 1, explanation: 'Fubini\'s theorem guarantees that order of integration can be switched without changing the final value for continuous functions over bounded rectangles.'
  },
  {
    id: 86, topic: 'Multiple Integrals', difficulty: 'Easy',
    question: 'When switching from rectangular coordinates (x,y) to polar coordinates (r,θ), the differential area element dA transforms into:',
    options: ['dr dθ', 'r dr dθ', 'r^2 dr dθ', '2π r dr'],
    correctAnswer: 1, explanation: 'The conversion factor (Jacobian determinant) adds an extra factor of r, making dA = r dr dθ.'
  },
  {
    id: 87, topic: 'Multiple Integrals', difficulty: 'Easy',
    question: 'What geometric property is calculated by the double integral ∬_R 1 dA?',
    options: ['The volume under a surface.', 'The surface area of region R.', 'The mass density factor.', 'The perimeter boundary length.'],
    correctAnswer: 1, explanation: 'Integrating the constant function 1 over a region R yields the exact geometric surface area of that region.'
  },
  {
    id: 88, topic: 'Multiple Integrals', difficulty: 'Easy',
    question: 'What is the standard volume element dV when integrating in cylindrical coordinates?',
    options: ['dz dr dθ', 'r dz dr dθ', 'ρ^2 sin(φ) dρ dθ dφ', 'dx dy dz'],
    correctAnswer: 1, explanation: 'Cylindrical coordinates extend polar setups linearly along z, maintaining the extra r factor: r dz dr dθ.'
  },
  {
    id: 89, topic: 'Multiple Integrals', difficulty: 'Medium',
    question: 'Evaluate the iterated double integral: ∫_0^1 ∫_0^2 xy dy dx.',
    options: ['1', '2', '1/2', '4'],
    correctAnswer: 0, explanation: 'Interior: [1/2 x y^2] from 0 to 2 = 2x. Exterior: ∫_0^1 2x dx = [x^2] from 0 to 1 = 1.'
  },
  {
    id: 90, topic: 'Multiple Integrals', difficulty: 'Medium',
    question: 'Reverse the order of integration for the expression: ∫_0^1 ∫_x^1 f(x,y) dy dx.',
    options: ['∫_0^1 ∫_0^y f(x,y) dx dy', '∫_0^1 ∫_y^1 f(x,y) dx dy', '∫_x^1 ∫_0^1 f(x,y) dx dy', '∫_0^1 ∫_0^x f(x,y) dx dy'],
    correctAnswer: 0, explanation: 'The region is bounded by y=x, y=1, and x=0. Sweeping horizontally first makes x range from 0 to y, and y range from 0 to 1.'
  },
  {
    id: 91, topic: 'Multiple Integrals', difficulty: 'Medium',
    question: 'Use polar coordinates to evaluate ∬_D (x^2 + y^2) dA over the unit disk D.',
    options: ['π/2', 'π/4', 'π', '2π'],
    correctAnswer: 0, explanation: 'The integral transforms into ∫_0^2π ∫_0^1 (r^2) * r dr dθ = 2π * [1/4 r^4]_0^1 = 2π / 4 = π/2.'
  },
  {
    id: 92, topic: 'Multiple Integrals', difficulty: 'Medium',
    question: 'In spherical coordinates, what does the variable φ (phi) represent?',
    options: ['The azimuthal angle in the xy-plane.', 'The polar angle measured down from the positive z-axis.', 'The radial distance from the origin.', 'The radius from the z-axis.'],
    correctAnswer: 1, explanation: 'φ tracks the angle measured down from the positive vertical z-axis, ranging from 0 to π.'
  },
  {
    id: 93, topic: 'Multiple Integrals', difficulty: 'Hard',
    question: 'Evaluate the triple integral ∭_E z dV, where E is the solid region bounded by the plane z = 0, z = x, and the parabolic cylinder x = 1 - y^2.',
    options: ['4/15', '8/15', '2/5', '0'],
    correctAnswer: 0, explanation: 'Setting up bounds and integrating yields a final volume mass allocation value of 4/15.'
  },
  {
    id: 94, topic: 'Multiple Integrals', difficulty: 'Hard',
    question: 'What is the absolute value of the Jacobian determinant when converting from rectangular to spherical coordinates?',
    options: ['ρ', 'ρ^2 sin(φ)', 'ρ sin(φ)', 'ρ^2 cos(φ)'],
    correctAnswer: 1, explanation: 'The metric scaling factor for spherical volume elements is explicitly derived as ρ^2 sin(φ).'
  },
  {
    id: 95, topic: 'Multiple Integrals', difficulty: 'Hard',
    question: 'Evaluate the integral ∬_R e^( (x-y)/(x+y) ) dA over the triangle vertices (0,0), (1,0), (0,1) using a linear variable transform.',
    options: ['1/4 (e - 1/e)', '1/2 (e - 1)', '1/4 (e - 1)', 'e - 1'],
    correctAnswer: 0, explanation: 'Applying the substitution u = x-y and v = x+y with its corresponding Jacobian evaluation yields a final value of 1/4 (e - 1/e).'
  },
  {
    id: 96, topic: 'Multiple Integrals', difficulty: 'Hard',
    question: 'Find the volume of the solid enclosed by the cylinder x^2 + y^2 = 4, bounded below by the plane z = 0 and above by the paraboloid z = x^2 + y^2.',
    options: ['8π', '4π', '16π', '2π'],
    correctAnswer: 0, explanation: 'In cylindrical coordinates: ∫_0^2π ∫_0^2 (r^2) * r dr dθ = 2π * [1/4 r^4]_0^2 = 2π * 4 = 8π.'
  }
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

const TOPICS = [
  'Lagrange Multipliers',
  'Divergence & Curl',
  "Stokes' Theorem",
  'Taylor Series for Multivariable Functions',
  'Partial Derivatives',
  'Vector Calculus',
  'Limits and Continuity',
  'Multiple Integrals'
];

export default function PractiseSection() {
  // --- LAYER 1: DIFFICULTY SELECTION ---
  const [chosenDifficulty, setChosenDifficulty] = useState(null);
  
  // --- LAYER 2: TOPIC SELECTION ---
  const [chosenTopic, setChosenTopic] = useState(null);

  // --- CORE GAMEPLAY STATE ---
  const [poolProblems, setPoolProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- RUNNING SCORE PERSISTENCE ---
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('arena_score_tracker');
    return saved ? JSON.parse(saved) : { correct: 0, total: 0 };
  });

  useEffect(() => {
    localStorage.setItem('arena_score_tracker', JSON.stringify(score));
  }, [score]);

  // Handle building the problem pool based on selection matrices
  useEffect(() => {
    if (chosenDifficulty && chosenTopic) {
      const filtered = PRACTICE_PROBLEMS.filter(
        p => p.difficulty === chosenDifficulty && p.topic === chosenTopic
      );
      setPoolProblems(filtered);
      if (filtered.length > 0) {
        setCurrentProblem(filtered[0]);
      } else {
        setCurrentProblem(null);
      }
      resetQuizTurn();
    }
  }, [chosenDifficulty, chosenTopic]);

  const resetQuizTurn = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };

  const handleSelectionReset = () => {
    setChosenDifficulty(null);
    setChosenTopic(null);
    setCurrentProblem(null);
    setPoolProblems([]);
    resetQuizTurn();
  };

  const handleAnswerClick = (index) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || isSubmitted) return;
    const correct = selectedAnswer === currentProblem.correctAnswer;
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    setIsSubmitted(true);
  };

  // RANDOM GENERATOR LOGIC
  const handleTriggerRandom = () => {
    if (poolProblems.length <= 1) return;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * poolProblems.length);
    } while (poolProblems[nextIndex].id === currentProblem?.id);
    setCurrentProblem(poolProblems[nextIndex]);
    resetQuizTurn();
  };

  const handleNextInSequence = () => {
    const currentIndex = poolProblems.findIndex(p => p.id === currentProblem.id);
    if (currentIndex !== -1 && currentIndex < poolProblems.length - 1) {
      setCurrentProblem(poolProblems[currentIndex + 1]);
    } else {
      setCurrentProblem(poolProblems[0]); // Loop back to the start of the pool
    }
    resetQuizTurn();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-800">
      
      {/* HUD SCOREBOARD PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 shadow-sm rounded-xl p-6 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 uppercase">Focused Practice Arena</h1>
          <p className="text-xs text-gray-500 mt-0.5">Comprehensive testing workspace for Advanced Calculus modules.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center bg-indigo-50 border border-indigo-100 px-4 py-2.5 rounded-lg">
          <div className="text-right mr-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-600">Total Score</span>
            <div className="text-xl font-black text-indigo-950">{score.correct} <span className="text-gray-400 font-normal">/</span> {score.total}</div>
          </div>
          <button 
            onClick={() => setScore({ correct: 0, total: 0 })}
            className="text-[11px] font-medium bg-white hover:bg-red-50 hover:text-red-600 text-gray-500 border border-gray-200 px-2 py-1 rounded transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* STEP 1: CHOOSE DIFFICULTY LEVEL */}
      {!chosenDifficulty && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-lg font-bold text-gray-950 mb-2">Select Targeted Practice Tier</h2>
          <p className="text-sm text-gray-500 mb-6">Choose a difficulty tier to unlock the specific topic modules.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DIFFICULTIES.map(level => (
              <button
                key={level}
                onClick={() => setChosenDifficulty(level)}
                className={`py-5 px-6 rounded-xl border text-base font-bold transition-all shadow-sm ${
                  level === 'Easy' ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-800' :
                  level === 'Medium' ? 'border-amber-200 bg-amber-50/40 hover:bg-amber-50 text-amber-800' :
                  'border-rose-200 bg-rose-50/40 hover:bg-rose-50 text-rose-800'
                }`}
              >
                {level} Mode
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: CHOOSE TOPIC MODULE */}
      {chosenDifficulty && !chosenTopic && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <span className="text-sm font-bold text-gray-500">
              Difficulty Tier: <span className="text-indigo-600 font-extrabold underline">{chosenDifficulty}</span>
            </span>
            <button 
              onClick={handleSelectionReset}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              ← Back to Tiers
            </button>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-4">Select Practice Topic:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => setChosenTopic(topic)}
                className="text-left p-4 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 border border-gray-200 rounded-lg text-sm font-semibold transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: INTERACTIVE TESTING INTERFACE */}
      {chosenDifficulty && chosenTopic && (
        <div className="space-y-4">
          
          {/* NAVIGATION ACTION BAR */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-600">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">{chosenDifficulty}</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900">{chosenTopic}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleTriggerRandom}
                disabled={poolProblems.length <= 1}
                className="text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-md disabled:opacity-40 transition"
              >
                🎲 Randomize Question
              </button>
              <button
                onClick={handleSelectionReset}
                className="text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded-md transition"
              >
                Change Rules
              </button>
            </div>
          </div>

          {/* MAIN PROBLEM CONTAINER */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            {currentProblem ? (
              <div>
                <div className="text-xs text-gray-400 font-medium mb-2 tracking-wider uppercase">
                  Question Workspace
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-6 leading-snug">
                  {currentProblem.question}
                </h2>

                {/* OPTION SELECTIONS */}
                <div className="space-y-2.5 mb-6">
                  {currentProblem.options.map((option, idx) => {
                    let styleClass = "border-gray-200 bg-white hover:bg-gray-50 text-gray-800";
                    if (selectedAnswer === idx && !isSubmitted) {
                      styleClass = "border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-600/20";
                    }
                    if (isSubmitted) {
                      if (idx === currentProblem.correctAnswer) {
                        styleClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold";
                      } else if (selectedAnswer === idx) {
                        styleClass = "border-rose-500 bg-rose-50 text-rose-950";
                      } else {
                        styleClass = "border-gray-100 text-gray-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => handleAnswerClick(idx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start ${styleClass}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-gray-100 text-[11px] font-black text-gray-500 flex items-center justify-center border border-gray-200 shrink-0 mr-3 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* FOOTER CONTROLS */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null || isSubmitted}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition shadow-sm"
                  >
                    Submit Verification
                  </button>

                  {isSubmitted && (
                    <button
                      onClick={handleNextInSequence}
                      className="bg-gray-950 hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition shadow-sm"
                    >
                      Next Problem →
                    </button>
                  )}
                </div>

                {/* EXPLANATION DRIVER BOX */}
                {isSubmitted && (
                  <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                    <h4 className="text-xs font-black tracking-wide uppercase text-emerald-800 mb-1">💡 Solution Insight</h4>
                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">{currentProblem.explanation}</p>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                No questions populated matching this configuration choice.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
