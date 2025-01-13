import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CoreEntity } from "./core.entity";

@Entity("todos")
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "date", name: "due_date", nullable: false})
  dueDate: Date;

  @Column({ type: "boolean", nullable: false })
  status: boolean;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: "user_uuid" })
  user: UserEntity;
}
