import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({
    name: 'movements'
})
export class Movement {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    category: string;

    @Column()
    description: string;
    
    @Column()
    value: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.movements)
    user: User;
}
