// express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    username?: string; // You can add other custom properties as needed
  }
}
