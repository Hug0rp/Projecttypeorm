import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import type { Request, Response } from "express";

export class UserController{
    private userRepository = AppDataSource.getRepository(User);

    async create(req: Request, res: Response){
        try{
            const {firstname, lastname} = req.body;
            const newUser = this.userRepository.create({firstname, lastname});
            await this.userRepository.save(newUser)
            return res.status(201).json({newUser});
        }catch( error: unknown){
            if(error instanceof Error){
                return res.status(400).json({error: error.message});
            }
            return res.status(500).json({ error: "Ocorreu um erro inesperado ao criar o usuário."});
          
        }
    }
    async listById(req: Request, res: Response) {
        try {
          const id = Number(req.params.id);
          if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
          }
          const user = await this.userRepository.findOneBy({ id });
          if (!user) {
            res.status(404).json({ message: "Usuário não encontrado!" });
          }
          return res.json(user);
        } catch (error: unknown) {
          if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
          }
          return res
            .status(500)
            .json({ error: "Ocorreu um erro inesperado ao listar o usuário." });
        }
      }

    async update(req:Request, res:Response){
       try{ const id = Number(req.params.id)
        const {firstname, lastname} = req.body
        if(isNaN(id)){
            res.status(400).json({message: "id inválido!"})
        }
        const user = await this.userRepository.findOneBy({id});
        if(!user){
            res.status(404).json({ message: "Usuário não encontrado!"});
        }
        user.firstname = firstname?? user.firstname;
        user.lastname = lastname?? user.lastname;
        await this.userRepository.save(user);
        return res.json(user);
    }catch (error: unknown){
        if( error instanceof Error){
            return res.status(400).json({ error: error.message})
        }
        return res.status(500).json({message: "Um erro desconhecido ocorreu!"})
    }
    }


    async list(req: Request, res: Response){
        try {
            const users = await this.userRepository.find();
            return res.json(users);
        } catch (error: unknown){
            if (error instanceof Error){
                return res.status(400).json({ error: error.message});
            }
            return res.status(500).json({ error: "Ocorreu um erro inesperado ao criar o usuário."});
        }
    }

    async listActive(req: Request, res:Response){
        try{
            const users = await this.userRepository.findBy({
            isActive: true});
            return res.json(users);
        }
        catch (error: unknown){
            if (error instanceof Error){
                return res.status(400).json({ error: error.message});
            }
            return res.status(500).json({ error: "Ocorreu um erro inesperado ao criar o usuário."});
        }
    }

    async delete(req: Request, res: Response ){
        try{
            const id = Number(req.params.id)
            if(isNaN(id)){
                res.status(400).json({message: "id inválido!"})
            }
            const result = await this.userRepository.delete(id)
            if(result.affected === 0){
                res.status(404).json({message: "Usuário não encontrado"})
            }
            return res.status(204).send()
        }catch (error: unknown){
            if( error instanceof Error){
                return res.status(400).json({ error: error.message})
            }
            return res.status(500).json({message: "Um erro desconhecido ocorreu!"})
        }
        
    }

    async toggleActive(req: Request, res:Response){
        try{
            const id = Number(req.params.id)
            if(isNaN(id)){
                res.status(400).json({message: "ID inválido!"})
                const user = await this.userRepository.findOneBy({id})
                if(!user){
                    res.status(404).json({message: "Usuário não encontrado"})
                }
                user.isActive = !user.isActive;
                await this.userRepository.save(user);
                return res.json({
                    message: `Usuário ${user.isActive ? "ativado" : "desativado"}
                    com sucesso.`,
                    user,
                })
            }
            }catch (error: unknown){
            if( error instanceof Error){
                return res.status(400).json({ error: error.message})
            }
            return res.status(500).json({message: "Um erro desconhecido ocorreu ao mudar o status!"})
        

    }
   
}}