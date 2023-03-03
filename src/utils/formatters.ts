import { IUser } from "../models";

interface IUsersList {
  fields: string[];
  items: string[][];
}

interface IFieldNames {
  [index: string]: string;
}

export const getFormattedField = (field: string, fieldValue: string | number) => {
  interface IResult {
    fieldName: string;
    fieldValue: string | number;
    isAddfield: boolean;
  }

  const fieldNames: IFieldNames = {
    "id": "getcourse_id",
    "Email": "email",
    "Тип регистрации": "registration_type",
    "Создан": "created_ad",
    "Последняя активность": "last_activity",
    "Имя": "first_name",
    "Фамилия": "last_name",
    "Телефон": "phone",
    "Дата рождения": "date_of_birth",
    "Возраст": "age",
    "Страна": "country",
    "Город": "city",
    "От партнера": "from_partner",
    "Откуда пришел": "from",  
    "ID партнера": "partner_id",
    "Email партнера": "partner_email",
    "ФИО партнера": "partner_full_name",
    "ФИО менеджера": "manager_full_name",
    "VK-ID": "vk_id",
    "utm_source": 'utm_source',
    "utm_medium": 'utm_medium',
    "utm_campaign": 'utm_campaign',
    "utm_term": 'utm_term',
    "utm_content": 'utm_content',
    "utm_group": 'utm_group'
  };

  // const numberFieldValues = ["getcourse_id", "club_score", "club_experience"];
  const numberFieldValues = [''];


  const value = numberFieldValues.includes(field) ? +fieldValue : fieldValue;
  const isAddfield = !fieldNames[field];


  const result: IResult = {
    fieldName: field,
    fieldValue: value,
    isAddfield: isAddfield
  }

  return result;
};



export const getFormattedUsers = (usersList: IUsersList) => {
  const result: IUser[] = [];

  const {fields, items} = usersList;

  for (const item of items) {
    const user: any = {
      addfields: {}
    }

    for (let i = 0; i < fields.length; i++) {
      const { fieldName, isAddfield, fieldValue } = getFormattedField(fields[i], item[i]);


      if (isAddfield) {
        user.addfields[fieldName] = fieldValue;
      } else {
        user[fieldName] = fieldValue;
      }
    
    }

    result.push(user);
  }

  return result;
}

