import { Channel } from "@/types/channel";

export const CHANNELS: Channel[] = [
    {
        id: "somoy_news_bd",
        name: "Somoy News",
        logo: "https://i.imgur.com/i54AQic.png",
        group: "News",
        tvgId: "SomoyNewsTV.bd",
        language: "Bengali",
        quality: "HD",
        activeUrlIndex: 0,
        urls: [
            "https://tvsen6.aynaott.com/somoytv/index.m3u8",
            "https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8"
        ]
    },
    {
        id: "gtv_bd",
        name: "GTV Bangladesh",
        logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Gazi_TV_logo.png",
        group: "Sports",
        tvgId: "GTV.bd",
        language: "Bengali",
        quality: "HD",
        activeUrlIndex: 0,
        urls: [
            "https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8"
        ]
    },
    {
        id: "tsports_bd",
        name: "T Sports",
        logo: "https://i.imgur.com/2JzlorD.png",
        group: "Sports",
        tvgId: "TSports.bd",
        language: "Bengali",
        quality: "HD",
        activeUrlIndex: 0,
        urls: [
            "https://tvsen7.aynaott.com/tsports-hd/index.m3u8",
            "https://tvsen7.aynaott.com/tsportsfhd/index.m3u8"
        ]
    },
    {
        id: "tsn_the_ocho",
        name: "TSN The Ocho",
        logo: "https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/CA1400003R3_20240709T002034SQUARE.png",
        group: "Sports",
        tvgId: "TSNTheOcho.ca",
        language: "English",
        quality: "HD",
        activeUrlIndex: 0,
        urls: [
            "https://d3pnbvng3bx2nj.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-rds8g35qfqrnv/TSN_The_Ocho.m3u8"
        ]
    },
    {
        id: "fifa_plus",
        name: "FIFA+",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/FIFA%2B_%282025%29.svg",
        group: "Sports",
        tvgId: "FIFAPlus",
        language: "English",
        quality: "HD",
        activeUrlIndex: 0,
        urls: [
            "https://jmp2.uk/plu-660bfca524e1d000085b6007.m3u8"
        ]
    }
];