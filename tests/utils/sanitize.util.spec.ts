import { sanitize } from '../../src/utils/sanitize.util';

describe('sanitize util', () => {
  it('should sanitize a string', () => {
    const input = '<script>alert("XSS attack")</script>';
    const sanitized = sanitize(input);
    expect(sanitized).not.toEqual(input);
  });

  it('should sanitize an array of strings', () => {
    const input = ['<script>alert("XSS attack")</script>', 'safe string'];
    const sanitized = sanitize(input);
    expect(sanitized[0]).not.toEqual(input[0]);
    expect(sanitized[1]).toEqual(input[1]);
  });

  it('should sanitize an object with string values', () => {
    const input = {
      key1: '<script>alert("XSS attack")</script>',
      key2: 'safe string',
    };
    const sanitized = sanitize(input);
    expect(sanitized.key1).not.toEqual(input.key1);
    expect(sanitized.key2).toEqual(input.key2);
  });

  it('should sanitize an object with nested objects and arrays', () => {
    const input = {
      key1: {
        nested: ['<script>alert("XSS attack")</script>', 'another safe string'],
      },
      key2: 'safe string',
    };
    const sanitized = sanitize(input);
    expect(sanitized.key1.nested[0]).not.toEqual(input.key1.nested[0]);
    expect(sanitized.key1.nested[1]).toEqual(input.key1.nested[1]);
    expect(sanitized.key2).toEqual(input.key2);
  });

  it('should return the input if it is not a string, array, or object', () => {
    const input = 42;
    const sanitized = sanitize(input);
    expect(sanitized).toEqual(input);
  });

  it('should accept and apply custom xssOptions', () => {
    const input = '<script>alert("XSS attack")</script>';
    const customXssOptions = {
      stripIgnoreTagBody: true,
      whiteList: { a: ['href'] },
    };
    const sanitized = sanitize(input, customXssOptions);
    expect(sanitized).toEqual(''); 
  });

  it('must return null when there is no input', () => {
    const sanitized = sanitize(null);
    expect(sanitized).toBeNull();
  });
});