import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import {MongoRepository} from "./repository/MongoRepository";
import {CatResponseDto} from "./dto/cat-response.dto";
import {PaginatedDto} from "./dto/paginated.dto";

@Injectable()
export class CatsService {
  constructor(private readonly repository: MongoRepository) {}

  async create(createCatDto: CreateCatDto): Promise<void> {
    await this.repository.create(createCatDto);
    return
  }

  async findAll(page: number, limit: number): Promise<PaginatedDto<CatResponseDto>> {
    return this.repository.findAll(page, limit);
  }

  async findOne(id: string): Promise<CatResponseDto> {
    return this.repository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
