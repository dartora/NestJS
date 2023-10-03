import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getDeployInfo(): string {
    return `
      <p>Deployment URL: ${process.env.VERCEL_URL}</p>
      <p>Git Commit SHA: ${process.env.VERCEL_GIT_COMMIT_SHA}</p>
      <p>Environment: ${process.env.VERCEL_ENV}</p>
    `;
  }
}
