export const typeDefs = `#graphql

    type User{
        id:ID
        fullName: String
        age: Int
        expenses: [Expense]
    }

    type Expense{
        id: ID
        title: String
        desc: String
        value: Int
        user: User

    }
    type Query{
        users: [User]
        user(id: ID!): User
        expenses: [Expense]
        expense(id: ID!): Expense
    }
    input CreateUserInput{
        fullName: String
        age: Int
    }
      input UpdateUserInput{
        fullName: String
        age: Int
    }

    input CreateExpenseInput{
        title: String
        desc: String
        value: Int
        userId: ID
    }
    input UpdateExpenseInput{
        title: String
        desc: String
        value: Int
    }
    type Mutation{
        createUser(createUserInput: CreateUserInput!): User
        updateUser(updateUserInput: UpdateUserInput, id:ID!): User
        deleteUser(id:ID!): User

        createExpense(createExpenseInput: CreateExpenseInput!): Expense
        updateExpense(updateExpenseInput: UpdateExpenseInput, id:ID!): Expense
        deleteExpense(id:ID!): Expense
    }
`;
