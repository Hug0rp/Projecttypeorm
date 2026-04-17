import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";



@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!:number;


    @Column('varchar')
    firstname!:string;

    @Column('varchar')
    lastname!:string;

    @Column({type: "boolean", default: true})
    isActive!: boolean;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}