import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Movement } from "./movement.entity";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    rut: string;

    @OneToMany(() => Movement, (movement) => movement.user)
    movements!: Movement[];
}
