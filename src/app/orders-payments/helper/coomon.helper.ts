import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { Schema } from "mongoose";

@Injectable()
export class CommonHelper {
    sendResponse(message: string, res: Response, status: number = 200 ,transactionLink: null | string = null) {
        return res.status(status).send({
            message,
            data: { transactionLink }
        });    
    };

    async saveVerifyLog(id: Schema.Types.ObjectId, verifyLog: any) {
        const dir = `${process.cwd()}/verify-payment/${new Date().toLocaleDateString('fa-IR')}`;
        !existsSync(dir) && mkdirSync(dir, { recursive: true });
        writeFileSync(`${dir}/${id}-${Date.now()}`, JSON.stringify(verifyLog));
    }
}