export interface Schedule {
  id: number;
  type: "playlist" | "streamer";
  name: string;
  start_timestamp: number;
  start: string;
  end_timestamp: number;
  end: string;
  is_now: boolean;
}
