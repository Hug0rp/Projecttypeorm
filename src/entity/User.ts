import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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
}