// utils/otpUtils.js
const otpStore = new Map(); // In-memory: { email: { otp, expiresAt } }

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const storeOTP = (email, otp) => {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(email, { otp, expiresAt });
};

const verifyOTP = (email, otp) => {
  const data = otpStore.get(email);
  if (!data || Date.now() > data.expiresAt || data.otp !== otp) return false;
  otpStore.delete(email); // One-time use
  return true;
};

module.exports = { generateOTP, storeOTP, verifyOTP };
