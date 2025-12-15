export function getSectors() {
    return [
        {
            en: 'Health Care',
            cn: '健康'
        },
        {
            en: 'Information Technology',
            cn: '信息技术'
        },
        {
            en: 'Financials',
            cn: '金融'
        },
        {
            en: 'Real Estate',
            cn: '房地产'
        },
        {
            en: 'Consumer Staples',
            cn: '必需消费品'
        },
        {
            en: 'Energy',
            cn: '能源'
        },
        {
            en: 'Materials',
            cn: '材料'
        },
        {
            en: 'Industrials',
            cn: '工业'
        },
        {
            en: 'Utilities',
            cn: '公用事业'
        },
        {
            en: 'Consumer Discretionary',
            cn: '非必需消费品'
        },
        {
            en: 'Communication Services',
            cn: '通信服务'
        },
        {
            en: '铜',
            cn: '铜'
        },
    ]
}

export function getSectorCN(sector) {
    let sectorCn = '';
    switch (sector) {
        case 'Health Care':
            return '健康';
        case 'Information Technology':
            return '信息技术';
        case 'Financials':
            return '金融';
        case 'Real Estate':
            return '房地产';
        case 'Consumer Staples':
            return '必需消费品';
        case 'Energy':
            return '能源';
        case 'Materials':
            return '材料';
        case 'Industrials':
            return '工业';
        case 'Utilities':
            return '公用事业';
        case 'Consumer Discretionary':
            return '非必需消费品';
        case 'Communication Services':
            return '通信服务';
        default:
            return sector;
    }

}

const industryMapCN = {
    "Semiconductor Materials & Equipment": "半导体材料与设备",
    "Industrial Conglomerates": "工业企业集团",
    "Health Care Facilities": "医疗设施",
    "Electric Utilities": "电力公用事业",
    "Electronic Components": "电子元件",
    "Environmental & Facilities Services": "环境与设施服务",
    "Other Specialized REITs": "其他专门型REIT",
    "Communications Equipment": "通信设备",
    "Consumer Staples Merchandise Retail": "消费必需品零售",
    "Life Sciences Tools & Services": "生命科学工具与服务",
    "Data Center REITs": "数据中心REIT",
    "Agricultural & Farm Machinery": "农业与农机",
    "Broadline Retail": "综合零售",
    "Electronic Equipment & Instruments": "电子设备与仪器",
    "Health Care REITs": "医疗保健REIT",
    "Research & Consulting Services": "研究与咨询服务",
    "Application Software": "应用软件",
    "Asset Management & Custody Banks": "资产管理与托管银行",
    "IT Consulting & Other Services": "IT咨询及其他服务",
    "Casinos & Gaming": "赌场与博彩",
    "Diversified Support Services": "多元化支持服务",
    "Health Care Distributors": "医疗分销商",
    "Brewers": "啤酒制造商",
    "Broadcasting": "广播",
    "Air Freight & Logistics": "空运物流",
    "Household Products": "家用产品",
    "Health Care Technology": "医疗技术",
    "Automobile Manufacturers": "汽车制造商",
    "Distillers & Vintners": "酿酒商",
    "Specialized Consumer Services": "专业化消费服务",
    "Commodity Chemicals": "大宗化学品",
    "Diversified Banks": "综合银行",
    "Distributors": "分销商",
    "Wireless Telecommunication Services": "无线电信服务",
    "Construction Materials": "建筑材料",
    "Footwear": "鞋类",
    "Gas Utilities": "天然气公用事业",
    "Multi-line Insurance": "多线保险",
    "Specialty Chemicals": "特种化学品",
    "Publishing": "出版",
    "Leisure Products": "休闲产品",
    "Managed Health Care": "管理式医疗",
    "Integrated Telecommunication Services": "综合电信服务",
    "Construction Machinery & Heavy Transportation Equipment": "建筑机械与重型运输设备",
    "Packaged Foods & Meats": "包装食品与肉类",
    "Single-Family Residential REITs": "单户住宅REIT",
    "Regional Banks": "地区性银行",
    "Automotive Retail": "汽车零售",
    "Real Estate Services": "房地产服务",
    "Consumer Finance": "消费金融",
    "Human Resource & Employment Services": "人力资源与就业服务",
    "Pharmaceuticals": "制药",
    "Reinsurance": "再保险",
    "Movies & Entertainment": "电影与娱乐",
    "Passenger Airlines": "客运航空公司",
    "Oil & Gas Storage & Transportation": "石油与天然气储运",
    "Fertilizers & Agricultural Chemicals": "肥料与农业化学品",
    "Financial Exchanges & Data": "金融交易所与数据",
    "Property & Casualty Insurance": "财产与意外保险",
    "Self-Storage REITs": "自助仓储REIT",
    "Metal, Glass & Plastic Containers": "金属、玻璃与塑料容器",
    "Transaction & Payment Processing Services": "交易与支付处理服务",
    "Computer & Electronics Retail": "电脑与电子零售",
    "Health Care Supplies": "医疗用品",
    "Steel": "钢铁",
    "Health Care Services": "医疗服务",
    "Health Care Equipment": "医疗设备",
    "Oil & Gas Exploration & Production": "石油与天然气勘探与生产",
    "Timber REITs": "林木REIT",
    "Other Specialty Retail": "其他专业零售",
    "Automotive Parts & Equipment": "汽车零部件与设备",
    "Apparel Retail": "服装零售",
    "Restaurants": "餐饮",
    "Food Distributors": "食品分销商",
    "Home Furnishings": "家居用品",
    "Construction & Engineering": "建筑与工程",
    "Technology Hardware, Storage & Peripherals": "技术硬件、存储与外设",
    "Independent Power Producers & Energy Traders": "独立发电商与能源交易商",
    "Industrial REITs": "工业REIT",
    "Life & Health Insurance": "人寿与健康保险",
    "Industrial Machinery & Supplies & Components": "工业机械、供应与零部件",
    "Homebuilding": "住宅建设",
    "Insurance Brokers": "保险经纪",
    "Heavy Electrical Equipment": "重型电气设备",
    "Biotechnology": "生物技术",
    "Technology Distributors": "技术分销商",
    "Paper & Plastic Packaging Products & Materials": "纸与塑料包装产品与材料",
    "Rail Transportation": "铁路运输",
    "Telecom Tower REITs": "通信塔REIT",
    "Hotel & Resort REITs": "酒店与度假村REIT",
    "Building Products": "建筑产品",
    "Multi-Utilities": "多功能公用事业",
    "Oil & Gas Refining & Marketing": "石油与天然气精炼与营销",
    "Home Improvement Retail": "家居建材零售",
    "Personal Care Products": "个人护理产品",
    "Data Processing & Outsourced Services": "数据处理与外包服务",
    "Gold": "黄金",
    "Copper": "铜",
    "Trading Companies & Distributors": "贸易公司与分销商",
    "Retail REITs": "零售REIT",
    "Tobacco": "烟草",
    "Cargo Ground Transportation": "货运地面运输",
    "Systems Software": "系统软件",
    "Advertising": "广告",
    "Consumer Electronics": "消费电子",
    "Multi-Family Residential REITs": "多户住宅REIT",
    "Oil & Gas Equipment & Services": "石油与天然气设备与服务",
    "Food Retail": "食品零售",
    "Investment Banking & Brokerage": "投资银行与经纪",
    "Aerospace & Defense": "航空航天与国防",
    "Office REITs": "办公REIT",
    "Passenger Ground Transportation": "客运地面运输",
    "Integrated Oil & Gas": "综合石油与天然气",
    "Drug Retail": "药品零售",
    "Multi-Sector Holdings": "多元化控股",
    "Hotels, Resorts & Cruise Lines": "酒店、度假村与邮轮",
    "Apparel, Accessories & Luxury Goods": "服装、配饰与奢侈品",
    "Industrial Gases": "工业气体",
    "Cable & Satellite": "有线与卫星",
    "Internet Services & Infrastructure": "互联网服务与基础设施",
    "Electrical Components & Equipment": "电气元件与设备",
    "Homefurnishing Retail": "家居用品零售",
    "Water Utilities": "水务公用事业",
    "Interactive Media & Services": "互动媒体与服务",
    "Semiconductors": "半导体",
    "Agricultural Products & Services": "农业产品与服务",
    "Soft Drinks & Non-alcoholic Beverages": "软饮料与非酒精饮料",
    "Interactive Home Entertainment": "互动家庭娱乐",
    "Electronic Manufacturing Services": "电子制造服务"
};
export function getIndustryMapCNStr(industryEN) {
    return industryMapCN[industryEN] || industryEN;
}

export function getTags() {
    return [
        {
            id: 1,
            tag: '铜'
        },
        {
            id: 2,
            tag: '黄金矿'
        }
    ]
}