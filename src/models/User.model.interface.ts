type UserConstants = {

};

type UserAddfields = {
}

export interface IUser {
  getcourse_id: number;
  email: string;
  registration_type: string;
  created_ad: string;
  last_activity: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  age: string;
  country: string;
  city: string;
  from_partner: string;
  from: string;
  partner_id: string;
  partner_email: string;
  partner_full_name: string;
  manager_full_name: string;
  vk_id: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  utm_group: string;
  addfields: {
    [index: string]: string | number;
  }
}
