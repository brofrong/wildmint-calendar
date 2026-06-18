import { defineRelations } from "drizzle-orm";
import { friendsTable, usersTable } from "./user.schema";


export const relations = defineRelations({user: usersTable, friends: friendsTable}, (r) => ({
  user:{
    friends: r.many.friends(),
  },
  friends: {
    user: r.one.user({
      from: r.friends.userId,
      to: r.user.id,
    }),
  },
}));
