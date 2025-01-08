import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    CONNECTION_STRING: str(),
    PORT: port(),
})