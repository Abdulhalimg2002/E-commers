import type { Ilogin, InputC, InputP, Isingup, updateU } from "../interface";

export const Singups:Isingup[]=[
    {
        Label:"username",
    name: "username",
    placeholder: "Username",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
      Label:"email",
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
      Label:"password",
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
]
export const Logins:Ilogin[]=[ {
    Label:"Email",
    name: "identifier",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
     Label:"password",
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },]
export const ProduactL: InputP[] = [
  {
    name: "title",
    label: "Product Title",
    id: "product",
    placeholder: "Enter product title",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "description",
    label: "Description",
    id: "description",
    placeholder: "Enter product description",
    type: "text",
    validation: {
      required: true,
      minLength: 20,
    },
  },
  {
    name: "price",
    label: "Price",
    id: "price",
    placeholder: "Enter product price",
    type: "number",
    validation: {
      required: true,
      min: 0,
    },
  },
  {
    name: "stock",
    label: "stock",
    id: "stock",
    placeholder: "Enter product stock",
    type: "number",
    validation: {
      required: true,
      min: 0,
    },
  },
  {
    name: "category",
    label: "Category",
    id: "category",
    type: "select",
    options: [], // سيتم ملؤها من API لاحقاً
    validation: {
      required: true,
    },
  },
  {
    name: "thumbnail",
    label: "Thumbnail Image",
    id: "thumbnail",
    type: "file",
    validation: {
      required: true,
      fileTypes: ["image/jpeg", "image/png"],
    },
  },
];
export const CategoryL: InputC[] = [
  {
    name: "title",
    label: "Category Title",
    id: "product",
    placeholder: "Enter category title",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  
  
 
  
  {
    name: "iconC",
    label: "iconC",
    id: "iconC",
    type: "file",
    validation: {
      required: true,
      fileTypes: ["image/jpeg", "image/png"],
    },
  },
];
export const IupdateInput: updateU[] = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },

];