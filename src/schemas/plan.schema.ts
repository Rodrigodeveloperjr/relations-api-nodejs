import { IPlanRequest } from "../interfaces/plans";
import { SchemaOf } from "yup";
import * as yup from "yup";

const planSchema: SchemaOf<IPlanRequest> = yup.object().shape({
  provider: yup.string().required("provider required"),
  planName: yup.string().required("plan_name required"),
  monthlyPayment: yup.number().required("monthly_payment required"),
  signatureDate: yup.string().required("signature_date required")
});

export { planSchema };
