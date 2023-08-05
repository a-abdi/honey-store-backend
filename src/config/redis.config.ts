export default () => ({
    url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` 
    || 
    "redis://:authpassword@127.0.0.1:6380",
});