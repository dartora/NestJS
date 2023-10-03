import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    let date = new Date();
    let saoPauloTime = date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    return 'Hello Worldd!' + saoPauloTime;
  }
}
