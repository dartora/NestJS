import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getDeployInfo(): string {
    return `
      <h1>Deployment Information</h1>
      <p>Deployment URL: ${process.env.VERCEL_URL}</p>
      <p>Git Commit SHA: ${process.env.VERCEL_GIT_COMMIT_SHA}</p>
      <p>Environment: ${process.env.VERCEL_ENV}</p>
      <p>Git Commit Message: ${process.env.VERCEL_GIT_COMMIT_MESSAGE}</p>
      <p>Git Commit Author Login: ${process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN}</p>
      <p>Git Commit Author Name: ${process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME}</p>
    `;
  }
}
