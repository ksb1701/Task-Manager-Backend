const allowedOrigins = [
  'http://localhost:8080',
  'https://task-manager-xi-tan.vercel.app',
  /^https:\/\/task-manager-[a-zA-Z0-9-]+\.vercel\.app$/
];

export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowed => 
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Blocked by CORS: Origin ${origin} is not allowed`));
    }
  },
  credentials: true 
};
