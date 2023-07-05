import { Injectable } from "@nestjs/common";
import { ChartQueryDto } from "../dto/chart-query.dto";
import { DayOf } from "src/common/declare/enum";

@Injectable()
export class QueryHelper {

    getReportDateFilter(query: ChartQueryDto) {
        let filter: any = [
            {
                $match: {
                    $and: [
                        {
                            status: query.status
                        },
                        {
                            $expr: { $lt: ['$createdAt', query.eDate]}
                        },
                        {
                            $expr: { $gte: ['$createdAt', query.sDate]}
                        }
                    ]
                }
            },    
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ];
        const groupId = filter[1].$group._id;
        switch (query.d) {
            case DayOf.Null: {
                delete groupId.day
                break;
            }
            case DayOf.Week: {
                groupId.day = { $dayOfWeek: "$createdAt" }
                break;
            }
            case DayOf.Year: {
                groupId.day = { $dayOfYear: "$createdAt" }
                break;
            }
            default: {
                groupId.day = { $dayOfMonth: "$createdAt" }
                break;
            }
        }
        if (query.y == 0) {
            delete groupId.year;
        }
        if (query.m == 0) {
            delete groupId.month;
        }
        return filter;
    };

    getStatusCount(query: ChartQueryDto) {
        let filter: any = [
            {
                $match: {
                    $and: [
                        {
                            $expr: { $lt: ['$createdAt', query.eDate]}
                        },
                        {
                            $expr: { $gte: ['$createdAt', query.sDate]}
                        }
                    ]
                }
            },    
            {
                $group: {
                    _id: "$status",
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ];
        return filter;
    }
}