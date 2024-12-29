import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { IUser, TUser } from './user.interface';

const userSchema = new Schema<TUser, IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:0 //to exclude from showing when get command is accepted.
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
  user.password = await bcrypt.hash(user?.password, Number(config.bycryptSalt));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id:string){
  return await UserModel.findOne({id}).select('+password') // As we set select 0 on the model so passwod field is omitted and it cannot be checked within our logic. so we need to explicitly declare that password will be selected among others so + symbol is used.
}

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword){
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

export const UserModel = model<TUser, IUser>('User', userSchema);
