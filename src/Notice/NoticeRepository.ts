import { Repository } from "typeorm";
import { Notice } from "./Notice";
import { AppDataSource } from "../data-source";
import { Service } from "typedi";


@Service()
export class NoticeRepository extends Repository<Notice> {
    constructor () {
        super(Notice,AppDataSource.createEntityManager())
    }
}