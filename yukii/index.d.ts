export declare class muzicard {
  constructor(options?: {
    name?: string;
    author?: string;
    color?: string;
    theme?: "classic" | "dynamic" | "neon" | "neonx" | "ravyy" | "ravyyx" | "anime" | "animex" | "animes" | "animesx" | "space" | "spacex" | "bluesky" | "blueskyx";
    brightness?: number;
    thumbnail?: string;
    progress?: number;
    startTime?: string;
    endTime?: string;
  });

  public setName(name: string): this;
  public setAuthor(author: string): this;
  public setColor(color: string): this;
  public setTheme(theme: "classic" | "dynamic" | "neon" | "neonx" | "ravyy" | "ravyyx" | "anime" | "animex" | "animes" | "animesx" | "space" | "spacex" | "bluesky" | "blueskyx"): this;
  public setBrightness(brightness: number): this;
  public setThumbnail(thumbnail: string): this;
  public setProgress(progress: number): this;
  public setStartTime(starttime: string): this;
  public setEndTime(endtime: string): this;

  public build(): Promise<Buffer>;
}
