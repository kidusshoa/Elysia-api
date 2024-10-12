import { allPosts } from "./db";

export async function getPosts() {
  try {
    return await allPosts;
  } catch (e: any) {
    console.log(`Error getting posts ${e}`);
  }
}

export async function getPost(id: Number) {
  try {
    const item = allPosts.find((i) => i.id === id);
    return item;
  } catch (e: any) {
    console.log(`Error getting post ${id}`);
  }
}

export async function createPost(options: { title: string; content: string }) {
  try {
    const { title, content } = options;
    const newId = Math.max(...allPosts.map((post) => post.id)) + 1;
    const newPost = await { id: newId, title: title, content: content };
    allPosts.push(newPost);
    console.log(newPost);
  } catch (e: any) {
    console.log(`Error creating post ${e}`);
  }
}

export async function updatePost(
  id: number,
  options: { title: string; content: string }
) {
  try {
    const { title, content } = options;
    const item = await allPosts.find((post) => post.id === id);

    if (!item) {
      throw new Error("No post to update");
    }

    if (title !== undefined) {
      item.title = title;
    }
    if (content !== undefined) {
      item.content = content;
    }
  } catch (e: any) {
    console.log(`Error creating post ${e}`);
  }
}
