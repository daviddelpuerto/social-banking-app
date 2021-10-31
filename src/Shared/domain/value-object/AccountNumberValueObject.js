export default class AccountNumberValueObject {
  constructor() {
    // Used the Math library as it does not need to be cryptographically random
    this.value = Math.floor(Math.random() * 9000000000) + 1;
  }
}
