import 'dotenv/config';

export class EnvUtil {
  public static get(propertyPath: string): string | any {
    return process.env[propertyPath] ?? undefined;
  }

  public static getOrThrow(propertyPath: string): string {
    const propertyValue = process.env[propertyPath] ?? undefined;

    if (!propertyValue) {
      throw new Error(`${propertyPath} is not a valid environment variable.`);
    }

    return propertyValue;
  }
}
