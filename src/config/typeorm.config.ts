import { TypeOrmModuleOptions } from "@nestjs/typeorm";


// it is a good practice to store the configuration in a separate file
// the configuration is an object of type TypeOrmModuleOptions
// the configuration object is exported as a constant named typeOrmConfig
// the configuration object is imported in the app.module.ts file
// the configuration object is passed to the TypeOrmModule.forRoot() method

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagment',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,

}
