import { Document, model, Schema, Types } from 'mongoose';
import { ObjectID } from 'mongodb';

const TriggerSchema = new Schema({
  userId: { type: Types.ObjectId },
  triggerId: {
    type: String,
    required: true,
  },
});

interface ITriggerSchema extends Document {
  userId: ObjectID;
  triggerId: string;
}

const Trigger = model<ITriggerSchema>('Trigger', TriggerSchema);
export default Trigger;
