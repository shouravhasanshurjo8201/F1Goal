export interface Channel {
  id: string;
  name: string;
  logo: string;
  group: string;
  tvgId: string;
  urls: string[];
  activeUrlIndex: number;
  quality?: string;
  language?: string;
}

export interface ChannelGroup {
  name: string;
  channels: Channel[];
}

export type PlayerStatus = "idle" | "loading" | "playing" | "error";
