import { User } from '../models/User';

export const filterUsersByRole = (users: User[], role: string): User[] => {
  if (role === 'All') return users;
  return users.filter((user) => user.role.toLowerCase() === role.toLowerCase());
};
