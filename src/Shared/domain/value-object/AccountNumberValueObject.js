export default class AccountNumberValueObject {
  constructor() {
    // Used the Math library as it does not need to be cryptographically random
    this.value = parseInt(Math.random().toFixed(10).replace('0.', ''), 10);
  }
}
