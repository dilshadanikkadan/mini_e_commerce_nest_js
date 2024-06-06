import { Schema, model, Document } from "mongoose";
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<IUser>(
  { 
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
          delete ret.password;
          delete ret.__v;
        },
    },
  }
);

UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
export const UserModel = model<IUser>("User", UserSchema);