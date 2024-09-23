import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: '../uploads',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  //       },
  //     }),
  //     fileFilter: (req, file, callback) => {
  //       if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
  //         return callback(new Error('Invalid file type'), false);
  //       }
  //       callback(null, true);
  //     },
  //   }),
  // )
  // async create(@Body() createUserDto: User, @UploadedFile() file: MulterProps) {
  //   const { File } = file;

  //   return this.usersService.create({ ...createUserDto, foto: File.filename });
  // }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateUserDto: User,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
