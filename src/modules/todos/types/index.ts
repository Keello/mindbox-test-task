export type TodoType = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export type TodoFilterType = 'All' | 'Active' | 'Completed';