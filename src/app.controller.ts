import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getDeployInfo(): string {
    return `
      <h1>Deployment Information</h1>
      <p><b>Deployment URL:</b> ${process.env.VERCEL_URL}</p>
      <p><b>Git Commit SHA:</b> ${process.env.VERCEL_GIT_COMMIT_SHA}</p>
      <p><b>Environment:</b> ${process.env.VERCEL_ENV}</p>
      <p><b>Git Commit Message:</b> ${process.env.VERCEL_GIT_COMMIT_MESSAGE}</p>
      <p><b>Git Commit Author Login:</b> ${process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN}</p>
      <p><b>Git Commit Author Name:</b> ${process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME}</p>
    `;
  }
}
