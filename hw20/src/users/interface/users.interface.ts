export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  gender: string;
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
}
