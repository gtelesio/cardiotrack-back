import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  DeleteDateColumn,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity({ name: 'measures' })
export class Measure {
  @ObjectIdColumn()
  @ApiProperty({ type: String, description: 'unique id of the entity' })
  id: ObjectID;

  @ApiProperty({ type: String, description: 'rolled of the entity' })
  @Column({ name: 'rolled', nullable: false })
  rolled: number;

  @ApiProperty({ type: String, description: 'pressure of the entity' })
  @Column({ name: 'pressure', nullable: false })
  pressure: number;

  @ApiProperty({ type: String, description: 'createdAt date' })
  @CreateDateColumn({ name: 'create_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @ApiProperty({ type: String, description: 'updatedAt of last modification' })
  @UpdateDateColumn({ name: 'update_at', type: 'timestamp without time zone' })
  updatedAt: Date;

  @ApiProperty({ type: String, description: 'deletedAt time when the entity was deleted' })
  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;
}

export class CreateMeasureDto {
  @IsNumber()
  @IsNotEmpty({ message: 'rolled is required' })
  readonly rolled: number;
  @IsNumber()
  @IsNotEmpty({ message: 'pressure is required' })
  readonly pressure: number;
}

export class ResponseMeasureDto {
  readonly id: ObjectID;
  readonly rolled: number;
  readonly pressure: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
