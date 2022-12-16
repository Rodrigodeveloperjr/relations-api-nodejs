import { IPlanRequest } from "../../interfaces/plans";
import { AppDataSource } from "../../data-source";
import { Plan } from "../../entities/plans";

const createPlanService = async (plan: IPlanRequest): Promise<Plan> => {
  const planRepository = AppDataSource.getRepository(Plan);

  const newPlan = new Plan();
  newPlan.provider = plan.provider;
  newPlan.planName = plan.planName;
  newPlan.monthlyPayment = plan.monthlyPayment;
  newPlan.signatureDate = plan.signatureDate;

  planRepository.create(newPlan);
  await planRepository.save(newPlan);

  return newPlan;
};

export { createPlanService };
