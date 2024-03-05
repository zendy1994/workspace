import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/app/file/entities/file.entity';

export const FileRepository = TypeOrmModule.forFeature([File]);
