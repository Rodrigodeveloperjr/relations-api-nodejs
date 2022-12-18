import { AppDataSource } from "../data-source";
import { Plan } from "../entities/plans";

const planRepository = AppDataSource.getRepository(Plan);

export { planRepository };
