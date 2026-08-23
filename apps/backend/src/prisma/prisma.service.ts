import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@eforma/database';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
    super({
      datasources: {
        db: {
          url: isVercel ? 'file:/tmp/dev.db' : 'file:../../packages/database/prisma/dev.db',
        },
      },
    });
  }

  async onModuleInit() {
    const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
    if (isVercel) {
      try {
        const sourcePath = path.join(__dirname, 'dev.db');
        fs.copyFileSync(sourcePath, '/tmp/dev.db');
        console.log('Successfully copied SQLite DB to /tmp');
      } catch (e) {
        console.error('Failed to copy SQLite database:', e);
      }
    }
    await this.$connect();
  }
}
