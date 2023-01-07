"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routes(app, db) {
    app.get("/", (request, response) => {
        response.json({
            message: "response js"
        });
    });
}
exports.default = routes;
