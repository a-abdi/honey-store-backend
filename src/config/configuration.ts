export default () => ({
    jwtSecret: parseInt(process.env.USER_JWT_SECRET) || 'zM4MDM0NzAsImV4cCI6MTY3MzgwMzUz',
});