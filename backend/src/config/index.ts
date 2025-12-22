export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3006,
  cors: {
    origin: '*' as string,
    methods: ['GET', 'POST', 'PUT', 'DELETE'] as string[],
  },
};
