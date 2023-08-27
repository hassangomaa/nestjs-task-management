import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";



@EntityRepository(User)
export class UserRepository extends Repository<User> {

    // constructor(
    //     private datssource: DataSource,
    // ) {
    //     super( User, datssource.createEntityManager()
    //     );
    // }


    //gonna create user
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        console.log('authCredentialsDto', authCredentialsDto);
        const { username, password } = authCredentialsDto;//destructuring!
        const user = new User();
        user.username = username;
        user.password = password;
        await user.save();

        // const user = this.create({ username, password });
        // await this.save(user);
    }
}