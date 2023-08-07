export default () => ({
    verifyUrl: process.env.SMS_VERIFY_URL,
    smsXApiKey: process.env.SMS_X_API_KEY,
    verifyCodeExpire: process.env.SMS_EXPIRE_VERIFY_CODE || 120,
    verifyCodeTemp: process.env.SMS_VERIFY_CODE_TEMP || 100000,
});