import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  mobileNumber?: number;

}

const StudentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: Number, required: false }

});

export default mongoose.model<IStudent>('Student', StudentSchema);
