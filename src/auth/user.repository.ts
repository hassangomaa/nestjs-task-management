import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor(
        private datssource: DataSource,
    ) {
        super( User, datssource.createEntityManager()
        );
    }

    //validate password
    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ where: { username } });        
        if(user && await user.validatePassword(password)){
            return username;
        }else{
            return null;
        }
    }


    //gonna create user
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        console.log('authCredentialsDto', authCredentialsDto);
        const { username, password } = authCredentialsDto;//destructuring!
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();//takes time to generate salt
        console.log('salt', user.salt.toString());
        //hashing password
        user.password =  bcrypt.hashSync(password, user.salt);//await user.hashPassword(password, user.salt);

        try {       
                await user.save();
            } catch (error) {
                console.log('error', error.code);// easy to handle error
                if(error.code === '23505'){
                    throw new Error('Username already exists');
                }else{
                    throw new Error('Something went wrong');
                } 
            }
    }

  
}