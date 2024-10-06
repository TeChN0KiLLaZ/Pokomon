import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Function to compare passwords
export const comparePassword = async (
  enteredPassword: string,
  storedHash: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, storedHash);
};
