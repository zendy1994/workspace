import { BaseEntity } from '@/common/entities/base.entity';
import { TableNames } from '@/utils/constants/table-names.constant';
import { User } from '@/app/user/entities/user.entity';
import { IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity(TableNames.FILE)
export class File extends BaseEntity {
  @Column('text')
  url: string;

  @Column()
  key: string;

  @Column()
  @IsNumber()
  size: number;

  @Column()
  type: string;

  @Column()
  file_name: string;

  @OneToOne(() => User, (user) => user.avatar, {
    onDelete: 'CASCADE',
  })
  avatar: User;
}
