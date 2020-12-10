import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';
import crypto from 'crypto';

const roleEnum = ['admin', 'manager', 'attendee'] as const;

export const UserSchema = createSchema(
  {
    role: Type.string({ enum: roleEnum, trim: true, required: true }),
    firstName: Type.string({ required: true }),
    lastName: Type.string({ required: true }),
    contract: Type.objectId(),
    phone: Type.string({ required: true }),
    email: Type.string({
      index: true,
      unique: true,
      trim: true,
      required: true,
    }),
    authentication: Type.object({ required: true }).of({
      local: Type.object({ required: true }).of({
        salt: Type.buffer(),
        password: Type.string({ required: true }),
        resetPasswordToken: Type.string(),
        resetPasswordExpires: Type.number(),
      }),
    }),
    ...({} as {
      comparePassword: (x: string) => boolean;
    }),
  },
  { timestamps: true }
);

export type UserDoc = ExtractDoc<typeof UserSchema>;

const encryptPassword = (password, salt) =>
  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

UserSchema.pre<UserDoc>('save', function (next) {
  if (this.authentication.local.password) {
    const salt = Buffer.from(
      crypto.randomBytes(32).toString('base64'),
      'base64'
    );
    this.authentication.local = {
      salt: salt as any,
      password: encryptPassword(this.authentication.local.password, salt),
    };
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return (
    encryptPassword(
      password,
      Buffer.from(this.authentication.local.salt.buffer)
    ) === this.authentication.local.password
  );
};

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  if (obj.authentication.local) {
    delete obj.authentication.local.password;
    delete obj.authentication.local.salt;
  }
  delete obj.__v;
  return obj;
};

export const Users = typedModel('Users', UserSchema);
