import type { InferType } from "yup";
import * as yup from "yup";
export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username should be at least 5 charachters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address.") ,
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 charachters."),
  })
  .required();
export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 charachters."),
      
  })
export const prodactSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(5, "The title must be at least 5 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(20, "The description must be at least 20 characters"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
    stock: yup
    .number()
    .typeError("stock must be a number")
    .required("stock is required")
    .positive("stock must be positive"),

  thumbnail: yup
  .mixed()
  .required("Thumbnail is required")
  .test("fileType", "Only jpg and png are allowed", (value) => {
    if (!value) return false; // لو ما في ملف
    // إذا value هو FileList أو Array، نأخذ أول عنصر
    const file = value instanceof File ? value : (value as FileList)[0];
    return file && ["image/jpeg", "image/png"].includes(file.type);
  }),

  category: yup
    .object({
      id: yup.number().required("Category is required"),
    })
    .required("Category is required"),
});

export const prodactEditSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(5, "The title must be at least 5 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(20, "The description must be at least 20 characters"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
    stock: yup
    .number()
    .typeError("stock must be a number")
    .required("stock is required")
    .positive("stock must be positive"),


  category: yup
    .object({
      id: yup.number().required("Category is required"),
    })
    .required("Category is required"),
});
export const CategoryS = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(5, "The title must be at least 5 characters"),

  

  iconC: yup
  .mixed()
  .required("iconC is required")
  .test("fileType", "Only jpg and png are allowed", (value) => {
    if (!value) return false; // لو ما في ملف
    // إذا value هو FileList أو Array، نأخذ أول عنصر
    const file = value instanceof File ? value : (value as FileList)[0];
    return file && ["image/jpeg", "image/png"].includes(file.type);
  }),

  
});
export const CategoryUS = yup
  .object({
    title: yup.string().trim().required("Title is required").min(5),

    iconC: yup
      .mixed<FileList>()
      .nullable()
      .notRequired(),
  })
  .defined();
  export const loginSchemaU = yup
  .object({
   username: yup
      .string()
      .required("Username is required")
      .min(6,"the username must be least 6 charachters. "),
   email: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address.") ,
      
  })
export type categoryEdit = InferType<typeof CategoryUS>;





