export default class TransactionDateValueObject {
  constructor(value) {
    const date = new Date(value);

    const year = date.toLocaleString().split(' ')[0];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const amOrPm = hours < 12 ? 'AM' : 'PM';
    const hoursFormattedToAmPm = hours > 12 ? (hours - 12) : hours;

    this.value = `${year} ${hoursFormattedToAmPm}:${minutes}:${seconds}${amOrPm}`;
  }
}
