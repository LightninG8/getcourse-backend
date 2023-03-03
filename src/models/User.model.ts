import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  getcourse_id: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  registration_type: {
    type: String,
  },
  created_ad: {
    type: String,
  },
  last_activity: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  age: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  from_partner: {
    type: String,
  },
  from: {
    type: String,
  },
  partner_id: {
    type: String,
  },
  partner_email: {
    type: String,
  },
  partner_full_name: {
    type: String,
  },
  manager_full_name: {
    type: String,
  },
  vk_id: {
    type: String,
  },
  utm_source: {
    type: String,
  },
  utm_medium: {
    type: String,
  },
  utm_campaign: {
    type: String,
  },
  utm_term: {
    type: String,
  },
  utm_content: {
    type: String,
  },
  utm_group: {
    type: String,
  },
  addfields: {
    type: Object,
  },
}, { timestamps: true });

export const UserModel = model('User', UserSchema)
