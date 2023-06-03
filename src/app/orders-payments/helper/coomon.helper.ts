import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class CommonHelper {
    sendResponse(message: string, res: Response, status: number = 200 ,transactionLink: null | string = null) {
        return res.status(status).send({
            message,
            data: { transactionLink }
        });    
    };
}