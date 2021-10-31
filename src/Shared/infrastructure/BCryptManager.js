import bcrypt from 'bcryptjs';

export default class BCryptManager {
  static async createHash(password, saltRounds = 5) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  static compareHash(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}
