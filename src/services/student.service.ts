import Student from "../models/Student";
import { calculateAge } from "../utils/date.utils";
import { validateAgeFromDOB } from "../utils/validation.utils";

export const createStudentService = async (payload: any) => {
  const dob = new Date(payload.dob);

  // Validate DOB age range
  validateAgeFromDOB(dob);

  const student = await Student.create({
    ...payload,
    dob,
  });

  return {
    ...student.toObject(),
    age: calculateAge(student.dateOfBirth!),
  };
};

export const getAllStudentsService = async () => {
  const students = await Student.find();

  return students.map(student => ({
    ...student.toObject(),
    age: calculateAge(student.dateOfBirth!),
  }));
};
