import { FileController } from '@/app/file/file.controller';
import { FileService } from '@/app/file/file.service';
import { FileRepository } from '@/app/file/repositories/file.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [FileRepository],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
