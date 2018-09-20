import {directionMap, offsetMap, statusMap} from "../assets/formatter.js";

function FormatDateTime(UnixTime) {
    var date = new Date(parseInt(UnixTime / 1000000));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    // var nano_second = UnixTime/1000000000 - parseInt(UnixTime/1000000000);
    // return y + '/' + m + '/' + d + '-' + h + ':' + minute + ':' + (second + String(nano_second.toFixed(6)).slice(1) );
    return y + '/' + m + '/' + d + '-' + h + ':' + minute + ':' + second;
};

export const quoteHeader = [{
    prop: "instrument_id",
    label: "合约代码",
	align: "left",
	width: 200,
}, {
    prop: "last_price",
    label: "最新价",
	align: "right",
}, {
    prop: "datetime",
    label: "时间",
    formatter: function (row, column) {
        try {
            return row.datetime.slice(11, 19);
        } catch (e) {
        }
    },
}, {
    prop: "bid_price1",
    label: "买价",
	align: "right",
}, {
    prop: "ask_price1",
    label: "卖价",
	align: "right",
}, {
    prop: "bid_volume1",
    label: "买量",
	align: "right",
}, {
    prop: "ask_volume1",
    label: "卖量",
	align: "right",
}, {
    prop: "change",
    label: "涨跌",
	align: "right",
    formatter: function (row, column) {
        try {
            return (row.change).toFixed(2);
        } catch (e) {
        }
    }
}, {
    prop: "change_percent",
    label: "涨跌幅",
	align: "right",
    formatter: function (row, column) {
        try {
            return (row.change_percent * 100).toFixed(2) + '%';
        } catch (e) {
        }
    }
}, {
    prop: "volume",
    label: "成交量",
	align: "right",
}, {
    prop: "open",
    label: "今开盘",
	align: "right",
}, {
    prop: "highest",
    label: "最高价",
	align: "right",
}, {
    prop: "lowest",
    label: "最低价",
	align: "right",
}, {
    prop: "open_interest",
    label: "持仓量",
	align: "right",
}, {
    prop: "lowest",
    label: "最低价",
	align: "right",
}, {
    prop: "pre_open_interest",
    label: "昨持",
	align: "right",
}, {
    prop: "pre_close",
    label: "昨收",
	align: "right",
}, {
    prop: "pre_settlement",
    label: "昨结算",
	align: "right",
}]


export const orderHeader = [{
    prop: "instrument_id",
    label: "合约代码",
	align: "left"
}, {
    prop: "direction",
    label: "买卖",
    formatter: function (row, column) {
        return directionMap[row.direction];
    }
}, {
    prop: "offset",
    label: "开平",
    formatter: function (row, column) {
        return offsetMap[row.offset];
    }
}, {
    prop: "status",
    label: "挂单状态",
    formatter: function (row, column) {
        if (row.status == "FINISHED") {
            if (row.exchange_order_id == "")
                return "错单";
            if (row.volume_left == 0)
                return "全部成交";
            else if (row.volume_left < row.volume_orign)
                return "已撤余单";
            else
                return "已撤销";
        }
        else {
            if (row.volume_orign - row.volume_left == 0)
                return "未成交";
            else
                return "部分成交";
        }
    }
}, {
    prop: "limit_price",
    label: "报单价格",
	align: "right",
}, {
    prop: "volume_orign",
    label: "报单手数",
	align: "right",
}, {
    prop: "volume_left",
    label: "未成交",
	align: "right",
}, {
    prop: "order_id",
    label: "报单编号",
	align: "left",
}, {
    prop: "insert_date_time",
    label: "报单时间",
	align: "right",
    formatter: function (row, column) {
        return FormatDateTime(row.insert_date_time);
    },
	width: 200,
}]

export const accountHeader = [{
    prop: "static_balance",
    label: "静态权益",
	align: "right",
    formatter: function (row, column) {
        return (row.static_balance).toFixed(2);
    }
}, {
    prop: "close_profit",
    label: "平仓盈亏",
	align: "right",
    formatter: function (row, column) {
        return (row.close_profit).toFixed(2);
    }
}, {
    prop: "position_profit",
    label: "持仓盈亏",
	align: "right",
    formatter: function (row, column) {
        return (row.position_profit).toFixed(2);
    }
}, {
    prop: "commission",
    label: "手续费",
	align: "right",
    formatter: function (row, column) {
        return (row.commission).toFixed(2);
    }
}, {
    prop: "balance",
    label: "动态权益",
	align: "right",
    formatter: function (row, column) {
        return (row.balance).toFixed(2);
    }
}, {
    prop: "margin",
    label: "占用保证金",
	align: "right",
    formatter: function (row, column) {
        return (row.margin).toFixed(2);
    }
}, {
    prop: "frozen_margin",
    label: "下单冻结",
	align: "right",
    formatter: function (row, column) {
        return (row.frozen_margin).toFixed(2);
    }
}, {
    prop: "available",
    label: "可用资金",
	align: "right",
    formatter: function (row, column) {
        return (row.available).toFixed(2);
    }
}, {
    prop: "risk_ratio",
    label: "风险度",
	align: "right",
    formatter: function (row, column) {
        return (row.risk_ratio * 100).toFixed(2) + '%';
    }
}]

export const positionHeader = [{
    prop: "instrument_id",
    label: "合约代码"
}, {
    prop: "instrument_id",
    label: "持仓方向",
    formatter: function (row, column) {
        if (row.volume_long > 0 && row.volume_short == 0)
            return "买  ";
        else if (row.volume_long == 0 && row.volume_short > 0)
            return "　卖";
        else if (row.volume_long > 0 && row.volume_short > 0)
            return "双向";
        else if (row.volume_long == 0 && row.volume_short == 0)
            return "无仓";
        else
            return "异常";
    }
}, {
    prop: "volume_long",
    label: "持仓手数",
	align: "right",
    formatter: function (row, column) {
        if (row.volume_long > 0 && row.volume_short == 0)
            return row.volume_long;
        else if (row.volume_long == 0 && row.volume_short > 0)
            return row.volume_short;
        else if (row.volume_long > 0 && row.volume_short > 0)
            return row.volume_long + "/" + row.volume_short;
        else if (row.volume_long == 0 && row.volume_short == 0)
            return "0";
        else
            return "异常";
    }
}, {
    prop: "volume_short",
    label: "开仓均价",
	align: "right",
    formatter: function (row, column) {
        if (row.volume_long > 0 && row.volume_short == 0)
            return row.open_price_long;
        else if (row.volume_long == 0 && row.volume_short > 0)
            return row.open_price_short;
        else if (row.volume_long > 0 && row.volume_short > 0)
            return row.open_price_long + "/" + row.open_price_short;
        else if (row.volume_long == 0 && row.volume_short == 0)
            return "0";
        else
            return "异常";
    }
}, {
    prop: "last_price",
	align: "right",
    label: "最新价"
}, {
    prop: "hedge_flag",
	align: "right",
    label: "持仓盈亏",
    formatter: function (row, column) {
        return (row.float_profit_long + row.float_profit_short).toFixed(2);
    }
}, {
    prop: "margin",
	align: "right",
    label: "持仓占用",
    formatter: function (row, column) {
        return (row.margin_long + row.margin_short).toFixed(2);
    }
}]

export const tradeHeader = [{
    prop: "exchange_id",
    label: "成交合约"
}, {
    prop: "direction",
    label: "买卖",
    formatter: function (row, column) {
        return directionMap[row.direction];
    }
}, {
    prop: "offset",
    label: "开平",
    formatter: function (row, column) {
        return offsetMap[row.offset];
    }
}, {
    prop: "price",
	align: "right",
    label: "成交价格"
}, {
    prop: "volume",
	align: "right",
    label: "手数"
}, {
    prop: "trade_date_time",
	align: "right",
    label: "成交时间",
    formatter: function (row, column) {
        return FormatDateTime(row.trade_date_time);
    }
}, {
    prop: "order_id",
    label: "报单编号"
}, {
    prop: "exchange_trade_id",
    label: "成交编号"
}]
