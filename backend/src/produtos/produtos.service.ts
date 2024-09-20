import { Injectable } from '@nestjs/common';
import { Produto } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.produto.findMany();
  }

  async findOne(id: number): Promise<Produto | null> {
    return this.prisma.produto.findUnique({
      where: { id },
    });
  }

  async create(data: Produto): Promise<Produto> {
    return this.prisma.produto.create({
      data,
    });
  }

  async update(id: number, data: Produto): Promise<Produto> {
    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.prisma.produto.delete({
      where: { id },
    });
    return { message: 'Produto deletado com sucesso!' };
  }
}
