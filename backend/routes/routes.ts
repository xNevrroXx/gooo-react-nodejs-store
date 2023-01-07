import {Express} from "express";
import {Pool} from "mysql";

function routes(app: Express, db: Pool) {
    app.get("/", (request: any, response: { json: (arg0: { message: string; }) => void; }) => {
        response.json({
            message: "response js"
        })
    })
}

export default routes;