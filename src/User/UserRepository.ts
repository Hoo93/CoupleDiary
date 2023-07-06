import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { Repository } from "typeorm";

export const UserRepository = AppDataSource.getRepository(User);