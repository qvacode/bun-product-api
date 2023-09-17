export const Env = {
    PORT: parseInt(<string>Bun.env.PORT) || 3001,
    HOST: Bun.env.HOST ?? 'localhost',
}