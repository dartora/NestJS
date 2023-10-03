import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });



  describe("getHello", () => {
    it('should return "Hello Worldz!"', () => {

      const date = new Date();
      let saoPauloTime = date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });

      const appController = app.get(AppController);
      expect(appController.getHello()).toBe("Hello Worldd!" + saoPauloTime);
    });
  });
});
