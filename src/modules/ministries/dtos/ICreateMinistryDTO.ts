import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateMinistryDTO {
  name: string;
  local?: string;
  date?: Date;
  hour?: Date;
  leaders?: User[];
}
