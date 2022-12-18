import { AppDataSource } from "../data-source";
import { Card } from "../entities/cards";

const cardRepository = AppDataSource.getRepository(Card);

export { cardRepository };
