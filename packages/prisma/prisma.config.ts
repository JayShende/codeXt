import 'dotenv/config';
import type { PrismaConfig } from 'prisma';

const config = {
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies PrismaConfig;

export default config;
