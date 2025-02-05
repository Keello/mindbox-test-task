import axios from 'axios';

export default class TodosService {
  static async getTodos() {
    return await axios.get('https://jsonplaceholder.typicode.com/todos', {
      params: {
        _limit: 10,
      },
    });
  }
}
