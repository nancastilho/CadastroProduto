import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(cpf: string, senha: string) {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (user.senha !== senha) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return user;
  }
}
