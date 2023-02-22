export const config = () => ({
  mongo_connect: process.env.MONGO_DB_CONNECT,
  secret_hash: process.env.SECRET_HASH,
});
