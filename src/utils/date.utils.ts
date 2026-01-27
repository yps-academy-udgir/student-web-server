export const calculateAge = (dob: Date): number => {

    if (!dob) {
      return 0;
    }
  const today = new Date();
  const birthDate = new Date(
    dob.getUTCFullYear(),
    dob.getUTCMonth(),
    dob.getUTCDate()
  );

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
