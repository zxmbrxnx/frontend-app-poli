import { column, defineDb, defineTable } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    password: column.text(),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

const Services = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    price: column.number(),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

export default defineDb({
  tables: { Users, Services },
});
