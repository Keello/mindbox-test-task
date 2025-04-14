import axios from 'axios';
import { TodoType } from '../types';

export interface ITodoServise {
  getTodos: (limit: number) => Promise<TodoType[]>;
  addTodo(todo: Partial<TodoType>): Promise<TodoType>;
  deleteTodo(id: number): Promise<number>;
}

export default class TodosService implements ITodoServise {
  private url: string;

  constructor() {
    this.url = 'https://jsonplaceholder.typicode.com/todos';
  }
  async getTodos(limit: number): Promise<TodoType[]> {
    try {
      const response = await axios.get(this.url, {
        params: {
          _limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async addTodo(todo: Partial<TodoType>): Promise<TodoType> {
    try {
      const response = await axios.post(this.url, todo);
      if (response.status !== 201) {
        throw new Error('Ошибка добавления дела');
      }
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteTodo(id: number): Promise<number> {
    try {
      const response = await axios.delete(`${this.url}/${id}`);
      if (response.status !== 200) {
        throw new Error('Ошибка удаления дела');
      }
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
