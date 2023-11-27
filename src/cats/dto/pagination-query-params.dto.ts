import {IsInt, Max, Min} from "class-validator";
import {Type} from "class-transformer";

export class PaginationQueryParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number = 1;
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly limit?: number = 25;
}