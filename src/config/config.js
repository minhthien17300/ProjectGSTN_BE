require('dotenv').config();
const configEnv = {
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	JWT_KEY: process.env.JWT_KEY,
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT,
	Email: process.env.Email,
	Password: process.env.Password,
};
const configFirebase = {
	API_KEY: process.env.API_KEY,
	AUTH_DOMAIN: process.env.AUTH_DOMAIN,
	PROJECT_ID: process.env.PROJECT_ID,
	STORAGE_BUCKET: process.env.STORAGE_BUCKET,
	MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
	APP_ID: process.env.APP_ID,
}
const DFRoleValue = ["User", "Admin"]
const DFGenderValue = ["Male","Female", "Unknown"]
const DFStatusesValue = ["ACTIVE","BAN"]
const DFGameStatusValue = ["VeryPositive","Positive","Mixed","Negative","VeryNegative"]
const DontSayTheseWords = ["fuck", "fucking", "trash", "shit", "cức"]
module.exports = {
	configEnv,
	configFirebase,
	DFRoleValue,
	DFGenderValue,
	DFStatusesValue,
    DFGameStatusValue,
	DontSayTheseWords,
};