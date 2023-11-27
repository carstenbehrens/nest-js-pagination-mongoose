import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';
import {PaginatedDto} from "./dto/paginated.dto";
import {CatResponseDto} from "./dto/cat-response.dto";
import {PaginationQueryParamsDto} from "./dto/pagination-query-params.dto";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query() paginationQueryParams: PaginationQueryParamsDto): Promise<PaginatedDto<CatResponseDto>> {
    const { page, limit } = paginationQueryParams
    return this.catsService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
