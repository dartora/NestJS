import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getDeployInfo(): string {
    return `
      Deployment URL: ${process.env.VERCEL_URL}
      Git Commit SHA: ${process.env.VERCEL_GIT_COMMIT_SHA}
      Environment: ${process.env.VERCEL_ENV}
    `;
  }
}
