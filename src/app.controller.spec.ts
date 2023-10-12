import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostService } from "./post/post.service";

describe("AppController", () => {
  let app: TestingModule;
  let controller: AppController;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    controller = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService); // Initialize appService here

  });



  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
