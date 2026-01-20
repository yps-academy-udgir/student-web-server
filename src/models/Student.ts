import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  mobileNumber?: number;
  email?: string;
  dateOfBirth?: Date;
  age?: number;

}

const StudentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: Number, required: false },
  email: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
});

export default mongoose.model<IStudent>('Student', StudentSchema);
