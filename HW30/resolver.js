import { expenses, users } from "./data.js";

export const resolvers = {
  Expense: {
    user: (parent) => {
      return users.find((u) => u.id === parent.user);
    },
  },
  User: {
    expenses: (parent) => {
      return expenses.filter((p) => Number(p.user) === Number(parent.id));
    },
  },
  Query: {
    users: () => {
      return users;
    },

    user: (_, args) => {
      return users.find((u) => u.id === Number(args.id));
    },

    expenses: () => {
      return expenses;
    },

    expense: (_, args) => {
      return expenses.find((e) => e.id === Number(args.id));
    },
  },

  Mutation: {
    createUser(_, { createUserInput }) {
      const lastId = users[users.length - 1]?.id || 0;
      const newUser = {
        id: lastId + 1,
        ...createUserInput,
      };

      users.push(newUser);
      return newUser;
    },

    deleteUser(_, args) {
      const index = users.findIndex((u) => u.id === Number(args.id));
      if (index === -1) {
        return null;
      }
      const deletedUser = users.splice(index, 1);
      return deletedUser[0];
    },

    updateUser(_, { updateUserInput, id }) {
      const index = users.findIndex((u) => u.id === Number(id));
      if (index === -1) {
        return null;
      }
      users[index] = { ...users[index], ...updateUserInput };

      return users[index];
    },

    createExpense(_, { createExpenseInput }) {
      const lastId = expenses[expenses.length - 1]?.id || 0;
      const newExpense = {
        id: lastId + 1,
        title: createExpenseInput.title,
        desc: createExpenseInput.desc,
        value: createExpenseInput.value,
        user: Number(createExpenseInput.userId),
      };

      expenses.push(newExpense);
      return newExpense;
    },

    deleteExpense(_, args) {
      const index = expenses.findIndex((e) => e.id === Number(args.id));
      if (index === -1) {
        return null;
      }

      const deletedExpense = expenses.splice(index, 1);
      return deletedExpense[0];
    },

    updateExpense(_, { updateExpenseInput, id }) {
      const index = expenses.findIndex((e) => e.id === Number(id));
      if (index === -1) {
        return null;
      }

      expenses[index] = { ...expenses[index], ...(updateExpenseInput ?? {}) };
      return expenses[index];
    },
  },
};
