import { v4 as uuidv4 } from 'uuid';

export class Mission {
  private readonly id: string;
  private details: string;
  private level: string;
  private zone: string;
  private reward: string;

  constructor(details?: string, level?: string, zone?: string, reward?: string) {
    this.id = uuidv4();
    this.details = details || '';
    this.level = level || '';
    this.zone = zone || '';
    this.reward = reward || '';
  }

  public getId(): string {
    return this.id;
  }

  public getDetails(): string {
    return this.details;
  }

  public setDetails(details: string): void {
    this.details = details;
  }

  public getLevel(): string {
    return this.level;
  }

  public setLevel(level: string): void {
    this.level = level;
  }

  public getZone(): string {
    return this.zone;
  }

  public setZone(zone: string): void {
    this.zone = zone;
  }

  public getReward(): string {
    return this.reward;
  }

  public setReward(reward: string): void {
    this.reward = reward;
  }
}
