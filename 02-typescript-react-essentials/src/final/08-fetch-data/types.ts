import { z } from 'zod';

export const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  info: z.string(),
  price: z.string(),
  // someValue: z.string(),
});

export type Tour = z.infer<typeof tourSchema>;
