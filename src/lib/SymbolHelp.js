import {
    STATUS_ACTIVE,
    STATUS_DISABLE
} from "../constants/userConstants"
export default {
    statuses() {
        return [
            {
                id: 1,
                name: '激活'
            },
            {
                id: 2,
                name: '停止'
            }
        ]
    },

    getSectors() {
        return [
            '信息技术', '金融', '健康', '必需消费品', '能源',  '材料',  '工业', '公用事业',  '非必需消费品', '通信服务', 'ETF', '房地产'
        ]
    },

    gicsList() {
        return {
            "Energy": {
                'cn': '能源',
                "industryGroups": {
                    "Energy": [
                        "Oil & Gas Drilling",
                        "Oil & Gas Equipment & Services",
                        "Oil & Gas Exploration & Production",
                        "Integrated Oil & Gas",
                        "Oil & Gas Refining & Marketing",
                        "Oil & Gas Storage & Transportation",
                        "Coal & Consumable Fuels"
                    ]
                }
            },

            "Materials": {
                "industryGroups": {
                    "Materials": [
                        "Commodity Chemicals",
                        "Diversified Chemicals",
                        "Fertilizers & Agricultural Chemicals",
                        "Industrial Gases",
                        "Specialty Chemicals",
                        "Construction Materials",
                        "Metal & Glass Containers",
                        "Paper & Plastic Packaging Products & Materials",
                        "Aluminum",
                        "Diversified Metals & Mining",
                        "Copper",
                        "Gold",
                        "Precious Metals & Minerals",
                        "Silver",
                        "Steel",
                        "Forest Products",
                        "Paper Products"
                    ]
                }
            },

            "Industrials": {
                "industryGroups": {
                    "Capital Goods": [
                        "Aerospace & Defense",
                        "Building Products",
                        "Construction & Engineering",
                        "Electrical Components & Equipment",
                        "Heavy Electrical Equipment",
                        "Industrial Conglomerates",
                        "Industrial Machinery",
                        "Trading Companies & Distributors"
                    ],
                    "Commercial & Professional Services": [
                        "Commercial Printing",
                        "Environmental & Facilities Services",
                        "Office Services & Supplies",
                        "Diversified Support Services",
                        "Security & Alarm Services",
                        "Human Resource & Employment Services",
                        "Research & Consulting Services"
                    ],
                    "Transportation": [
                        "Air Freight & Logistics",
                        "Passenger Airlines",
                        "Marine Transportation",
                        "Railroads",
                        "Trucking",
                        "Airport Services",
                        "Highways & Railtracks",
                        "Marine Ports & Services"
                    ]
                }
            },

            "Consumer Discretionary": {
                "industryGroups": {
                    "Automobiles & Components": [
                        "Automobile Manufacturers",
                        "Automotive Parts & Equipment",
                        "Tires & Rubber"
                    ],
                    "Consumer Durables & Apparel": [
                        "Consumer Electronics",
                        "Home Furnishings",
                        "Homebuilding",
                        "Household Appliances",
                        "Housewares & Specialties",
                        "Leisure Products",
                        "Apparel, Accessories & Luxury Goods",
                        "Footwear",
                        "Textiles"
                    ],
                    "Consumer Services": [
                        "Casinos & Gaming",
                        "Hotels, Resorts & Cruise Lines",
                        "Leisure Facilities",
                        "Restaurants"
                    ],
                    "Retailing": [
                        "Distributors",
                        "Broadline Retail",
                        "Apparel Retail",
                        "Computer & Electronics Retail",
                        "Home Improvement Retail",
                        "Specialty Retail",
                        "Automotive Retail",
                        "Internet & Direct Marketing Retail"
                    ]
                }
            },

            "Consumer Staples": {
                "industryGroups": {
                    "Food & Staples Retailing": [
                        "Drug Retail",
                        "Food Distributors",
                        "Food Retail",
                        "Hypermarkets & Super Centers"
                    ],
                    "Food, Beverage & Tobacco": [
                        "Agricultural Products",
                        "Packaged Foods & Meats",
                        "Soft Drinks",
                        "Brewers",
                        "Distillers & Vintners",
                        "Tobacco"
                    ],
                    "Household & Personal Products": [
                        "Household Products",
                        "Personal Products"
                    ]
                }
            },

            "Health Care": {
                "industryGroups": {
                    "Health Care Equipment & Services": [
                        "Health Care Equipment",
                        "Health Care Supplies",
                        "Health Care Distributors",
                        "Health Care Services",
                        "Health Care Facilities",
                        "Managed Health Care"
                    ],
                    "Pharmaceuticals, Biotechnology & Life Sciences": [
                        "Biotechnology",
                        "Pharmaceuticals",
                        "Life Sciences Tools & Services"
                    ]
                }
            },

            "Financials": {
                "industryGroups": {
                    "Banks": [
                        "Diversified Banks",
                        "Regional Banks"
                    ],
                    "Financial Services": [
                        "Multi-Sector Holdings",
                        "Specialized Finance",
                        "Commercial & Residential Mortgage Finance",
                        "Consumer Finance",
                        "Asset Management & Custody Banks",
                        "Investment Banking & Brokerage",
                        "Diversified Capital Markets"
                    ],
                    "Insurance": [
                        "Insurance Brokers",
                        "Life & Health Insurance",
                        "Multi-line Insurance",
                        "Property & Casualty Insurance",
                        "Reinsurance"
                    ]
                }
            },

            "Information Technology": {
                "industryGroups": {
                    "Software & Services": [
                        "IT Consulting & Other Services",
                        "Data Processing & Outsourced Services",
                        "Internet Services & Infrastructure",
                        "Application Software",
                        "Systems Software"
                    ],
                    "Technology Hardware & Equipment": [
                        "Communications Equipment",
                        "Technology Hardware, Storage & Peripherals",
                        "Electronic Equipment & Instruments",
                        "Electronic Components"
                    ],
                    "Semiconductors & Semiconductor Equipment": [
                        "Semiconductors",
                        "Semiconductor Equipment"
                    ]
                }
            },

            "Communication Services": {
                "industryGroups": {
                    "Telecommunication Services": [
                        "Integrated Telecommunication Services",
                        "Wireless Telecommunication Services"
                    ],
                    "Media & Entertainment": [
                        "Advertising",
                        "Broadcasting",
                        "Cable & Satellite",
                        "Publishing",
                        "Movies & Entertainment",
                        "Interactive Home Entertainment",
                        "Interactive Media & Services"
                    ]
                }
            },

            "Utilities": {
                "industryGroups": {
                    "Utilities": [
                        "Electric Utilities",
                        "Gas Utilities",
                        "Multi-Utilities",
                        "Water Utilities",
                        "Independent Power Producers & Energy Traders",
                        "Renewable Electricity"
                    ]
                }
            },

            "Real Estate": {
                "industryGroups": {
                    "Equity Real Estate Investment Trusts (REITs)": [
                        "Diversified REITs",
                        "Industrial REITs",
                        "Hotel & Resort REITs",
                        "Office REITs",
                        "Health Care REITs",
                        "Residential REITs",
                        "Retail REITs",
                        "Specialized REITs"
                    ],
                    "Real Estate Management & Development": [
                        "Real Estate Development",
                        "Real Estate Operating Companies",
                        "Real Estate Services"
                    ]
                }
            }
        }

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
                "软件",
                "SaaS",
                "云计算",
                "网络安全",
                "硬件",
                'AI',
                '手机',
                '在线预订',
                '咨询',
                '系统集成',
                '内容创作',
                '无线',
                '网络服务',
                '半导体制造设备',
                'IT服务',
                '数据',
                '企业级',
                '设计软件',
                '汽车'
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
                '肿瘤',
                '免疫',
                '制药',
                '诊断',
                '基因',
                '美容',
                '心血管',
                '糖尿病',
                '血糖监测仪',
                '心脏起搏器',
                '配方奶粉'
            ],

            '金融': [
                "银行",
                "保险",
                '抵押贷款',
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
        const general = [

            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',

        ]
        return tags?.[sector] || [];
    },

    normalizeTagsBySectors(sectors, tags) {
        console.log('sectors:', sectors);
        console.log('tags:', tags);

        // ✅ 正确调用方式
       // console.log(this.sectorTagMap('健康'));

        const allowedTags = new Set(
            sectors.flatMap(sector => this.sectorTagMap(sector))
        );

        console.log('allowedTags:', allowedTags);

        return tags.filter(tag => allowedTags.has(tag));
    }
}