import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from '@prisma/client';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  async findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtosService.findOne(id);
  }

  @Post()
  async create(@Body() createProdutoDto: Produto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateProdutoDto: Produto,
  ) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
