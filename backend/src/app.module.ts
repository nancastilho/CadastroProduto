import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProdutosModule } from './produtos/produtos.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [PrismaModule, UsersModule, ProdutosModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
