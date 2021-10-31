import UserAccountNumber from './UserAccountNumber';

export default class User {
  constructor({
    firstName, lastName, age, email, password, balance,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.password = password;
    this.balance = balance;
    this.accountNumber = new UserAccountNumber().value;
  }
}
