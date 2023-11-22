import {Repository} from "./Repository";
import {CreateCatDto} from "../dto/create-cat.dto";
import {CatResponseDto} from "../dto/cat-response.dto";
import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "../schemas/cat.schema";
import { CatDocument } from "../schemas/cat.schema";
import {Model} from "mongoose";
import {PaginatedDto} from "../dto/paginated.dto";

@Injectable()
export class MongoRepository implements Repository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  private convert(cat: CatDocument): CatResponseDto {
    const json = cat.toObject({ versionKey: false });
    const id = json._id;
    delete json._id;
    return {
      ...json,
      id: String(id),
    };
  }

  async create(createCatDto: CreateCatDto): Promise<void> {
    await this.catModel.create(createCatDto);
    return
  }

  async findOne(id: string): Promise<CatResponseDto> {
    const catDoc = await this.catModel.findOne({ _id: id }).exec();
    if (!catDoc) {
      throw new NotFoundException('cat not found');
    }
    return this.convert(catDoc)
  }

  async findAll(page: number, limit: number): Promise<PaginatedDto<CatResponseDto>> {
    const cats = await this.catModel.find().limit(limit).skip((page -1) * limit).exec();
    const itemCount = await this.catModel.count();

    return new PaginatedDto<CatResponseDto>(cats.map(this.convert), page, limit, itemCount)
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.catModel.deleteOne({ _id: id }).exec();
    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException('cat not found');
    }
  }
}
