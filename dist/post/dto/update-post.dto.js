"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_post_dto_1 = require("./create-post.dto");
class UpdatePostDto extends (0, swagger_1.PartialType)(create_post_dto_1.CreatePostDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=update-post.dto.js.map