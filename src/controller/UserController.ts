import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController{
    private userRepository = AppDataSource.getRepository(User);

    async create(req: Request, res: Response){
        try{
            const {firstname, lastname} = req.body;
            const newUser = this.userRepository.create({firstname, lastname})
            await this.userRepository.save(newUser)
            return res.status(201).json({ error: error.message});
        }catch
    }
}