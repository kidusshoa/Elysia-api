import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./handlers";

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
  .put("/post/:id", ({ params: { id }, body }) => updatePost(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object(
      {
        title: t.Optional(
          t.String({
            minLength: 3,
            maxLength: 50,
          })
        ),
        content: t.Optional(
          t.String({
            minLength: 3,
            maxLength: 50,
          })
        ),
      },
      { minProperties: 1 }
    ),
  })
  .delete("/post/:postId", ({ params: { postId } }) => deletePost(postId), {
    params: t.Object({
      postId: t.Numeric(),
    }),
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
