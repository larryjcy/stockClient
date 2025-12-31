import {
    STATUS_ACTIVE,
    STATUS_DISABLE
} from "../constants/userConstants"
export default {
    statuses() {
        return [
            {
                id: 1,
                name: 'Active'
            },
            {
                id: 2,
                name: 'Disable'
            }
        ]
    },
    getAllStatusList() {
        return [
            {
                label: 'Active',
                value: STATUS_ACTIVE
            },

            {
                label: 'Disable',
                value: STATUS_DISABLE
            },
            {
                label: 'All',
                value: 0
            }
        ]
    },

    getSectors() {
        return [
            '健康', '信息技术', '金融', '房地产', '必需消费品', '能源',  '材料',  '工业', '公用事业',  '非必需消费品', '通信服务', 'ETF'
        ]
    },

    sectorTagMap(sector) {
        console.log('sectorTagMap:' + sector);
        const tags = {
            '材料': [
                "金属与采矿",
                "锂",
                "电池材料",
                "稀土",
                "铜",
                "黄金",
                "化工",
                "精细化工",
                "战略金属"
            ],

            '能源': [
                "石油与天然气",
                "上游",
                "中游",
                "下游",
                "可再生能源",
                "太阳能",
                "风能",
                "氢能",
                "铀",
                "核能"
            ],

            '工业': [
                "机械制造",
                "自动化",
                "电气设备",
                "电网",
                "基础设施",
                "物流",
                "航空航天",
                "国防军工"
            ],

            '信息技术': [
                "半导体",
                "人工智能",
                "芯片",
                "软件",
                "SaaS",
                "云计算",
                "网络安全",
                "硬件"
            ],

            '非必需消费品': [
                "汽车",
                "电动车",
                "电池",
                "零售",
                "电商",
                "旅游",
                "休闲消费"
            ],

            '必需消费品': [
                "食品饮料",
                "日用消费品",
                "防御型",
                "高分红"
            ],

            '健康': [
                "生物科技",
                "制药",
                "医疗器械",
                "医疗服务",
                "基因技术"
            ],

            '金融': [
                "银行",
                "保险",
                "资本市场",
                "金融科技",
                "支付",
                "利率敏感"
            ],

            '公用事业': [
                "电力公用事业",
                "水务",
                "燃气",
                "电网",
                "防御型"
            ],

            '房地产': [
                "REITs",
                "住宅",
                "商业地产",
                "工业地产",
                "数据中心"
            ]
        }
        console.log( tags?.[sector])
        return tags?.[sector] || [];
    }
}