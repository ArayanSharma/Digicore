// One-time setup script: creates the first Admin account so the login/forgot-password
// flow has something real to authenticate against. Run with: npm run seed:admin
// Reads ADMIN_SEED_NAME / ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD from .env.
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../Model/Admin.js";

async function seedAdmin() {
  const name = process.env.ADMIN_SEED_NAME || "Super Admin";
  const email = (process.env.ADMIN_SEED_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD || "";

  if (!email || !password) {
    console.error(
      "ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set in Backend/.env before seeding."
    );
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin with email "${email}" already exists. No changes made.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({ name, email, password: hashedPassword });

  console.log(`Admin account created for "${email}". You can now log in with this account.`);
  await mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error("Failed to seed admin:", err);
  process.exit(1);
});
