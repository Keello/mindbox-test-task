export type TodosType = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export type TodosFilterType = 'All' | 'Active' | 'Completed';