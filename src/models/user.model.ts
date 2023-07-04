import { Service } from "typedi"

@Service()
export class UserRepository {
    
    createUser = (req,res,next) => {
        res.send('created repo')
    }
}