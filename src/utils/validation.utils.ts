import { calculateAge } from "./date.utils";

const MIN_AGE = 3;
const MAX_AGE = 100;

export const validateAgeFromDOB = (dob: Date): void => {
  const age = calculateAge(dob);

  if (age < MIN_AGE || age > MAX_AGE) {
    throw new Error(
      `Student age must be between ${MIN_AGE} and ${MAX_AGE} years`
    );
  }
};
