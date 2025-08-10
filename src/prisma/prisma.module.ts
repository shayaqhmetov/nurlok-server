import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // чтобы не импортировать в каждый модуль вручную
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
