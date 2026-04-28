import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { noBlankSpacesConstraint } from "../decorators/noBlankSpaces";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  @IsNotEmpty({ message: "Título é obrigatório!" })
  @IsString({ message: "Título precisa ser um texto" })
  @MinLength(5, { message: "Título deve ter pelo menos 5 caracteres." })
  @Validate(noBlankSpacesConstraint, {
    message: "O titulo do post precisa ter algum texto!"
  })
  title!: string;

  @Column("text")
  @IsNotEmpty({ message: "Conteúdo é obrigatório!" })
  @IsString({ message: "Conteúdo precisa ser um texto" })
  @Validate(noBlankSpacesConstraint)
  content!: string;
  // Um usuário pode ter muitos posts
  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  user!: User;
}