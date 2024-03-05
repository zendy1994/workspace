import { JwtAuthGuard } from '@/app/auth/guards/jwt-auth.guard';
import { File } from '@/app/file/entities/file.entity';
import { FileService } from '@/app/file/file.service';
import { ApiTagNames } from '@/utils/constants/api-tags.contant';
import { Routes } from '@/utils/constants/routes.constant';
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(ApiTagNames.FILE)
@Controller(Routes.FILE.prefix)
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private fileService: FileService) {}

  @Post(Routes.FILE.upload)
  @UseInterceptors(FileInterceptor('file'))
  uploadPublicFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return this.fileService.uploadSingleFile(file);
  }

  @Post(Routes.FILE.uploadMultiple)
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiplePublicFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Array<File>> {
    return this.fileService.uploadMultipleFile(files);
  }
}
