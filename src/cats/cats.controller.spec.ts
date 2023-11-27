import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { PaginationQueryParamsDto } from './dto/pagination-query-params.dto'
import {PaginatedDto} from "./dto/paginated.dto";
import {CatResponseDto} from "./dto/cat-response.dto";

describe('Cats Controller', () => {
  let controller: CatsController;
  let service: CatsService;

  const createCatDto: CreateCatDto = {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
  };

  const mockCat = {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
    _id: 'a id',
  };

  const paginationQueryParamsDto = new PaginationQueryParamsDto()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(new PaginatedDto<CatResponseDto>([
              {
                id: '1',
                name: 'Cat #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                id: '2',
                name: 'Cat #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                id: '3',
                name: 'Cat #3',
                breed: 'Breed #3',
                age: 2,
              },
            ], 1, 10, 3)),
            create: jest.fn().mockResolvedValue(createCatDto),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce();

      await controller.create(createCatDto);
      expect(createSpy).toHaveBeenCalledWith(createCatDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      await expect(controller.findAll(paginationQueryParamsDto)).resolves.toEqual(new PaginatedDto<CatResponseDto>([
              {
                id: '1',
                name: 'Cat #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                id: '2',
                name: 'Cat #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                id: '3',
                name: 'Cat #3',
                breed: 'Breed #3',
                age: 2,
              },
            ], 1, 10, 3));
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
