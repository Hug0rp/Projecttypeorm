import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export class PostController{
    private postRepository = AppDataSource.getRepository(Post)
    private userRepository = AppDataSource.getRepository(User)

    async list(req: Request, res: Response){
        try{
            const posts = await this.postRepository.find()
            return res.json(posts)
        }catch (error: unknown){
            if (error instanceof Error){
                return res.status(400).json({ error: error.message});
            }
            return res.status(500).json({ error: "Ocorreu um erro inesperado ao criar o usuário."});
        }
    }

    async create(req: Request, res: Response){
        try{
            const {title, content, userId } = req.body;
            if(isNaN(userId)) {
                res.status(400).json({message: "Id do usuário invalido!"});
            }
            const user = await this.userRepository.findOneBy({
                id: userId
            }) ;
            if(!user){
                res.status(400).json({message: "Usuário não encontrado!"});
            }
            const newPost = this.postRepository.create({title, content, user});
            await this.postRepository.save(newPost);
            return res.status(201).json(newPost);
        }catch(error : unknown){
            if(error instanceof Error){
                return res.status(400).json({ error: error.message});
            }
            return res.status(500).json({ error: "Ocorreu um erro inesperado ao cadastar o post."})

        }
    }

}