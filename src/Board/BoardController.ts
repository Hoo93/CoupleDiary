import { Body, Delete, Get, JsonController, Param, Patch, Post, Req } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CreateBoardDto } from "./dto/createBoardDto";
import { Category } from "../Category/Category";
import { Board } from "./Board";
import { UpdateBoardDto } from "./dto/updateBoardDto";
import { Request } from "express";
import { BoardService } from "./BoardService";

@JsonController('/board')
@Service()
export class BoardController {
    constructor (
        @Inject()
        private boardService:BoardService
    ) {}

    @Post()
    public async createBoard(@Body() createBoardDto:CreateBoardDto):Promise<Board> {
        try {
            return await this.boardService.createBoard(createBoardDto)
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Get()
    public async findAll():Promise<Board[]> {
        try {
            return await this.boardService.findAll();
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Get('/:id')
    public async findById(@Param('id') id:number):Promise<Board> {
        try {
            return await this.boardService.findById(id);
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Patch('/:id')
    public async updateBoard(
        @Param('/id') id:number,
        @Body() updateBoardDto:UpdateBoardDto) {
            try {
                return await this.boardService.updateBoard(id,updateBoardDto);
            } catch (error) {
                console.error("controller error:",error)
                return error.message
            }
        }
    
    @Delete('/:id')
    public async deleteBoard (@Param('id') id:number) {
        try {
            return await this.boardService.deleteBoard(id)
        } catch(error) {
            console.log("delete error")
            console.error(error);
            return error.message;
        }
    }



}