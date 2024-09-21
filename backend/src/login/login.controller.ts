import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: { cpf: string; senha: string }) {
    const { cpf, senha } = body;
    return this.loginService.login(cpf, senha);
  }
}
