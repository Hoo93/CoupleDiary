import { Inject, Service } from "typedi";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { NoticeRepository } from "./NoticeRepository";
import { Notice } from "./Notice";

@Service()
export class noticeService {
    constructor(
        @Inject()
        private noticeRepository: NoticeRepository,
    ) {}

    public async findnoticeById(id: number): Promise<Notice> {
        const notice = await this.noticeRepository.findOneBy({ id });
        if (!notice) {
            throw new NotFoundError(`notice with ${id} doesn't exist`);
        }
        return notice;
    }

    public async findAll(): Promise<Notice[]> {
        return await this.noticeRepository.find();
    }

    public async updatenotice(
        id: number,
        updateNoticeDto: UpdateNoticeDto,
    ): Promise<Number> {
        let notice = await this.noticeRepository.findOneBy({ id });
    }

    public async deleteNotice(id: number): Promise<Notice> {
        let notice = await this.noticeRepository.findOneBy({ id });
    }
}
