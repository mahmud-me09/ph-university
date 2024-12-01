import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import TUser from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordReset: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Teacher', 'Student', 'Admin'],
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['blocked', 'in-progress'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

// password Hashing
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bycryptSalt));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', userSchema);
