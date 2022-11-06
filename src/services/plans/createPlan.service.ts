import { IPlanRequest } from "../../interfaces/plans"
import { AppDataSource } from "../../data-source"
import { Plan } from "../../entities/plans"


const createPlanService = async ({ provider, plan_name, monthly_payment, signature_date }: IPlanRequest): Promise<Plan> => {

    const planRepository = AppDataSource.getRepository(Plan)

    const plan = new Plan()
    plan.provider = provider
    plan.plan_name = plan_name
    plan.monthly_payment = monthly_payment
    plan.signature_date = signature_date

    planRepository.create(plan)
    await planRepository.save(plan)
    
    return plan
}

export { createPlanService }
