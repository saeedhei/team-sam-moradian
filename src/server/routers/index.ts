import { router } from '../trpc';
import { userRouter } from './user.router';
import { lessonRouter } from './lesson.router'; // Add this

export const appRouter = router({
  user: userRouter,
  lesson: lessonRouter, // Add this
});

export type AppRouter = typeof appRouter;
