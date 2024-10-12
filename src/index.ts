import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { createPost, getPost, getPosts } from "./handlers";

const app = new Elysia()
  .use(swagger())
  .get("/", () => getPosts())
  .get("/post/:id", ({ params: { id } }) => getPost(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/", ({ body }) => createPost(body), {
    body: t.Object({
      title: t.String({
        minLength: 3,
        maxLength: 50,
      }),
      content: t.String({
        minLength: 3,
        maxLength: 50,
      }),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
