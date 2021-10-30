import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const { Types } = Schema;

const TransactionsSchema = new Schema({
  sender: {
    type: Types.ObjectId,
    ref: 'Users',
  },
  receiver: {
    type: Types.ObjectId,
    ref: 'Users',
  },
  balance: {
    type: Types.Number,
    required: [true, 'Balance is required'],
    validate: {
      validator: (v) => v >= 1,
      message: 'The minimun balance on transactions is 1',
    },
  },
  state: {
    type: Types.String,
    enum: ['pending', 'processed', 'canceled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const TransactionsModel = model('Transactions', TransactionsSchema);

export default TransactionsModel;
