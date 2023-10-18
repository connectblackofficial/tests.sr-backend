import logger, {log} from '../../src/helpers/logger.helper';
import * as winston from 'winston';

describe('Logger Configuration', () => {
  it('should configure logger for production environment', () => {
    const productionLogger: winston.Logger = log('production');

    expect(productionLogger.level).toBe('info');
    expect(productionLogger.silent).toBeFalsy();
    expect(productionLogger.transports.length).toBe(3);
  });

  it('should configure logger for non-production environment', () => {
    const developmentLogger: winston.Logger = log('development');

    expect(developmentLogger.level).toBe('debug');
    expect(developmentLogger.silent).toBeFalsy();
    expect(developmentLogger.transports.length).toBe(4);
  });

  it('should configure silent logger for test environment', () => {
    const testLogger = logger as winston.Logger;

    expect(testLogger.silent).toBeTruthy();
  });
});

