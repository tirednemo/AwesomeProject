import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {User} from '../types/User';

export const addUser = async (db: SQLiteDatabase, user: User) => {
  const insertQuery = `
     INSERT INTO Users (name, email, password)
     VALUES (?, ?, ?)
   `;
  const values = [user.name, user.email, user.password];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add user');
  }
};

export const getUsers = async (db: SQLiteDatabase): Promise<User[]> => {
  try {
    const users: User[] = [];
    const results = await db.executeSql('SELECT * FROM Users');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index));
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Users from database');
  }
};

export const updateUser = async (db: SQLiteDatabase, updatedUser: User) => {
  const updateQuery = `
      UPDATE Users
      SET email = ?, name = ?, password = ?
      WHERE id = ?
    `;
  const values = [
    updatedUser.email,
    updatedUser.name,
    updatedUser.password,
    updatedUser.id,
  ];
  try {
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update user');
  }
};

export const deleteUser = async (db: SQLiteDatabase, user: User) => {
  const deleteQuery = `
      DELETE FROM Users
      WHERE id = ?
    `;
  const values = [user.id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove user');
  }
};
