import { IProductRequest } from "../interfaces/products";
import { SchemaOf } from "yup";
import * as yup from "yup";

const productSchema: SchemaOf<IProductRequest> = yup.object().shape({
  title: yup.string().required("title required"),
  description: yup.string(),
  category: yup.string().required("category required"),
  price: yup.number().required("price required"),
});

export { productSchema };
