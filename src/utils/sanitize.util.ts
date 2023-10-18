import type { Sanitized, SanitizeOptions } from './types.util';
import xss from 'xss';

/**
 * Sanitizes the provided data by applying XSS filtering and returning a copy of the data with all properties and values set as readonly.
 *
 * @param data The data to be sanitized.
 * @param options The options to configure the XSS filtering process.
 *
 * @returns A sanitized copy of the provided data with all properties and values set as readonly.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const sanitize = <T extends unknown>(data: T, options?: SanitizeOptions): Sanitized<T> => {
  if (!data) {
    return data as unknown as Sanitized<T>;
  }

  if (Array.isArray(data)) {
    const sanitizedArray = data.map((item) => sanitize(item, options)) as unknown as Sanitized<T>;
    return sanitizedArray;
  }

  if (typeof data === 'object' && data !== null) {
    const sanitizedObject = {} as { [K in keyof T]: Sanitized<T[K]> };

    for (const [key, value] of Object.entries(data)) {
      sanitizedObject[key as keyof T] = sanitize(value, options);
    }
    return sanitizedObject as Sanitized<T>;
  }

  if (typeof data === 'string') {
    const xssOptions: SanitizeOptions = {
      stripIgnoreTagBody: options?.stripIgnoreTagBody ?? false,
      whiteList: options?.whiteList ?? {},
      ...options
    };
    return xss(data, xssOptions) as Sanitized<T>;
  }

  return data as Sanitized<T>;
};
