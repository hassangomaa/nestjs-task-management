import { Entity, EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";



@EntityRepository(User)
export class UserRepository extends Repository<User> {


//   async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
//     const { username, password } = authCredentialsDto;
//     // const user = new User();
//     // user.username = username;
//     // user.password = password;
//     // await user.save();
//     const user = this.create({ username, password });
//     await this.save(user);
//   }
}