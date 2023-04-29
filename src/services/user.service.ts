import { Model } from 'sequelize';
import { ServiceInterface } from '../interfaces/service.interface';
import User from '../models/user.model';

export default class UserService implements ServiceInterface<Model> {
    private readonly userModel: typeof User; // add this property

    constructor(userModel: typeof User) {
      this.userModel = userModel; // assign the parameter to the property
    }
    async create(data: any): Promise<Model> {
      const user = await this.userModel.create(data);
      return user;
    }
  
    async update(id: string, data: any): Promise<Model | null> {
      const [numUpdated, updatedUsers] = await this.userModel.update(data, { where: { id }, returning: true });
      if (numUpdated === 0) {
        return null;
      }
      return updatedUsers[0];
    }
  
    async delete(id: string): Promise<Model | null> {
      const deletedRows = await this.userModel.destroy({ where: { id } });
      if (deletedRows === 0) {
        return null;
      }
      return await this.userModel.findByPk(id);
    }
  
    async findOne(filter: any): Promise<Model | null> {
      const user = await this.userModel.findOne({ where: filter });
      return user;
    }
  
    async findWithSpecificFields(filter: any, fields: any): Promise<Model | null> {
      const user = await this.userModel.findOne({ where: filter, attributes: fields });
      return user;
    }
  
    async findAll(filter: any): Promise<Model[]> {
      const users = await this.userModel.findAll({ where: filter });
      return users;
    }
  
    async findAllWithSpecificFields(filter: any, fields: any): Promise<Model[]> {
      const users = await this.userModel.findAll({ where: filter, attributes: fields });
      return users;
    }
}
