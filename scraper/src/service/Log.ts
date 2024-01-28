export enum LogLevel {
  TRACE,
  INFO,
  WARNING,
  ERROR,
}

export async function Log(level: LogLevel, message: string) {
  console.log(`${level.toString()}: ${message}`);
}
