import { Model } from 'sequelize';

export interface ServiceInterface<T extends Model> {
    create(data: any): Promise<T>;
    update(id: string, data: any): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findOne(filter: any): Promise<T | null>;
    findWithSpecificFields(filter: any, fields: any): Promise<T | null>;
    findAll(filter: any): Promise<T[]>;
    findAllWithSpecificFields(filter: any, fields: any): Promise<T[]>;
}