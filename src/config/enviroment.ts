import env from "env-var"

export const ADMINJS_COOKIE_PASS = env.get("ADMINJS_COOKIE_PASS").required().asString()

export const JWT_KEY = env.get("JWT_KEY").required().asString()