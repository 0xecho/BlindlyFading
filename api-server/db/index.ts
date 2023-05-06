export type User = { id: string; name: string; };

interface Database {
  users: {
    list (): Promise<User[]>;
    byId (id: string): Promise<User> | never;
    create (data: { name: string }): Promise<User>;
  }
}

class TempDb implements Database {
  private lastId = 1;
  private _dataUsers: User[] = [{
    id: '1',
    name: 'Test',
  }]

  public users: Database['users'] = {
    list: async () => {
      return this._dataUsers;
    },
    byId: async (id) => {
      const existingUser: User | undefined = this._dataUsers.find((user) => user.id === id);
      if (existingUser) {
        return existingUser;
      }
      throw new Error('Could not find user with id "' + id + '"')
    },
    create: async (data) => {
      this.lastId++;
      const newUser: User = { id: this.lastId + '', ...data };
      this._dataUsers = [...this._dataUsers, newUser];
      return newUser;
    }
  }
}

export const db = new TempDb();