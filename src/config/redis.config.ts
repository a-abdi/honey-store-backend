export default () => ({
    url: process.env.REDIS_URL || "redis://:authpassword@127.0.0.1:6380",
});