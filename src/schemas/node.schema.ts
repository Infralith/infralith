import { z } from 'zod';

export const nodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  label: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export type NodeSchema = z.infer<typeof nodeSchema>;
