import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/declare/enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ChartQueryDto } from './dto/chart-query.dto';
import { OrdersTransactionsService } from '../orders/orders-transactions.service';
import { QueryHelper } from './helper/query.helper';

@Controller('chart')
export class ChartController {
    constructor(
        private readonly ordersService: OrdersTransactionsService,
        private readonly queryHelper: QueryHelper,
    ) {}

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('order/date')
    async orderDate(@Query() query: ChartQueryDto) {
        const queryFilter = this.queryHelper.getReportDateFilter(query);
        return this.ordersService.report(queryFilter);
    }
}
