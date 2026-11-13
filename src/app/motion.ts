// Shared, critically damped springs: controls settle quickly without a rubbery bounce.
export const spring = { type: "spring", stiffness: 420, damping: 36, mass: 1 } as const;
export const quickSpring = { type: "spring", stiffness: 600, damping: 38, mass: 0.65 } as const;
