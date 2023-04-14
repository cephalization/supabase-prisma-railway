import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function poll() {
  return new Promise(async (resolve) => {
    console.log("Fetching posts...");
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
    });

    console.log(posts);

    setTimeout(() => resolve(poll()), 10000);
    console.log(`Fetched at: ${new Date().getSeconds()}s`);
    console.log("Polling for new posts in 10 seconds...");
  });
}

async function main() {
  // Retrieve all published posts
  const allPosts = await prisma.post.findMany({
    where: { published: true },
  });
  console.log("Retrieved all published posts: ", allPosts);

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await prisma.post.create({
    data: {
      title: "Join us for another episode of What's new in Prisma",
      content:
        "https://youtube.com/playlist?list=PLn2e1F9Rfr6l1B9RP0A9NdX7i7QIWfBa7",
      published: false,
      author: {
        connect: {
          email: "alice@prisma.io",
        },
      },
    },
  });
  console.log("Created a new post:", newPost);

  // Publish the new post
  const updatedPost = await prisma.post.update({
    where: {
      id: newPost.id,
    },
    data: {
      published: true,
    },
  });
  console.log(`Published the newly created post: `, updatedPost);

  // Retrieve all posts by user with email alice@prisma.io
  const postsByUser = await prisma.user
    .findUnique({
      where: {
        email: "alice@prisma.io",
      },
    })
    .posts();
  console.log(`Retrieved all posts from a specific user: `, postsByUser);

  console.log("Polling for new posts...");
  await poll();
}

async function cleanup() {
  await prisma.$disconnect();
  process.exit(1);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGKILL", cleanup);

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await cleanup();
  });
