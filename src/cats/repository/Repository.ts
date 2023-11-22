import {CreateCatDto} from "../dto/create-cat.dto";
import {CatResponseDto} from "../dto/cat-response.dto";
import {PaginatedDto} from "../dto/paginated.dto";

export interface Repository {
  create(createCatDto: CreateCatDto): Promise<void>;
  findOne(id: string): Promise<CatResponseDto>;
  findAll(page: number, limit: number): Promise<PaginatedDto<CatResponseDto>>;
  delete(id: string): Promise<void>;
}
