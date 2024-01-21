import IORedis from 'ioredis';

const redis = new IORedis({
  host: 'redis-16963.c325.us-east-1-4.ec2.cloud.redislabs.com',
  port: 16963,
  password: 'tF5Kf4lK6aIzt4FP6oUyJfddTVas0s9M',
});

export default redis;