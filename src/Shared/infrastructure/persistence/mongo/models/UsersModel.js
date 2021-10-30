import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const { Types } = Schema;

const UsersSchema = new Schema({
  firstName: {
    type: Types.String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: Types.String,
    required: [true, 'Last name is required'],
  },
  birthdate: {
    type: Types.Date,
    required: [true, 'Birthdate is required'],
  },
  email: {
    type: Types.String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
    trim: true,
  },
  password: {
    type: Types.String,
    required: [true, 'Password is required'],
    minlength: 14,
    select: false,
  },
  accountType: {
    type: Types.String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  accountNumber: {
    type: Types.String,
    required: [true, 'Account number is required'],
    minlength: 10,
  },
  accountBalance: {
    type: Types.Number,
    required: [true, 'Account balance is required'],
    validate: {
      validator: (balance) => balance > 0,
      message: 'You need to provide a valid amount for you account balance',
    },
  },
  followers: {
    type: Types.Map,
    of: {
      user: {
        type: Types.ObjectId,
        ref: 'Users',
      },
    },
    default: {},
  },
  following: {
    type: Types.Map,
    of: {
      user: {
        type: Types.ObjectId,
        ref: 'Users',
      },
    },
    default: {},
  },
  connectionRequests: {
    type: Types.ObjectId,
    ref: 'Users',
    select: false,
  },
  transactions: [
    {
      type: Types.ObjectId,
      ref: 'Transactions',
    },
  ],
}, {
  timestamps: true,
});

const UsersModel = model('Users', UsersSchema);

export default UsersModel;
