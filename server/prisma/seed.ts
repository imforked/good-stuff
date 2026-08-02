import "dotenv/config";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

const SEED_PASSWORD = "password1234";

const usersToCreate = [
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    slug: "sarah",
    displayName: "Sarah",
  },
  {
    name: "Marcus Lee",
    email: "marcus@example.com",
    slug: "marcus",
    displayName: "Marcus",
  },
  {
    name: "Aisha Patel",
    email: "aisha@example.com",
    slug: "aisha",
    displayName: "Aisha",
  },
  {
    name: "Jordan Blake",
    email: "jordan@example.com",
    slug: "jordan",
    displayName: "Jordan",
  },
  {
    name: "Sam Rivera",
    email: "sam@example.com",
    slug: "sam",
    displayName: "Sam",
  },
  {
    name: "Priya Nair",
    email: "priya@example.com",
    slug: "priya",
    displayName: "Priya",
  },
  {
    name: "Chris Nguyen",
    email: "chris@example.com",
    slug: "chris",
    displayName: "Chris",
  },
  {
    name: "Elena Rossi",
    email: "elena@example.com",
    slug: "elena",
    displayName: "Elena",
  },
  {
    name: "Devon Brooks",
    email: "devon@example.com",
    slug: "devon",
    displayName: "Devon",
  },
  {
    name: "Mina Park",
    email: "mina@example.com",
    slug: "mina",
    displayName: "Mina",
  },
  {
    name: "Luis Ortega",
    email: "luis@example.com",
    slug: "luis",
    displayName: "Luis",
  },
  {
    name: "Hannah Kim",
    email: "hannah@example.com",
    slug: "hannah",
    displayName: "Hannah",
  },
  {
    name: "Omar Hassan",
    email: "omar@example.com",
    slug: "omar",
    displayName: "Omar",
  },
  {
    name: "Riley Quinn",
    email: "riley@example.com",
    slug: "riley",
    displayName: "Riley",
  },
  {
    name: "Tina Alvarez",
    email: "tina@example.com",
    slug: "tina",
    displayName: "Tina",
  },
  {
    name: "Ben Carter",
    email: "ben@example.com",
    slug: "ben",
    displayName: "Ben",
  },
  {
    name: "Nora Schmidt",
    email: "nora@example.com",
    slug: "nora",
    displayName: "Nora",
  },
  {
    name: "Kai Thompson",
    email: "kai@example.com",
    slug: "kai",
    displayName: "Kai",
  },
  {
    name: "Zoe Mitchell",
    email: "zoe@example.com",
    slug: "zoe",
    displayName: "Zoe",
  },
  {
    name: "Alex Morgan",
    email: "alex@example.com",
    slug: "alex",
    displayName: "Alex",
  },
] as const;

const createUser = async (input: (typeof usersToCreate)[number]) => {
  const avatarUrl = `https://i.pravatar.cc/150?u=${input.slug}`;

  const result = await auth.api.signUpEmail({
    body: {
      name: input.name,
      email: input.email,
      password: SEED_PASSWORD,
      image: avatarUrl,
    },
  });

  await prisma.profile.create({
    data: {
      userId: result.user.id,
      displayName: input.displayName,
      pfpS3Url: avatarUrl,
    },
  });

  return result.user;
};

type SeedUser = Awaited<ReturnType<typeof createUser>>;

const main = async () => {
  console.log("Seeding database...");

  const seedEmails = usersToCreate.map((user) => user.email);

  await prisma.user.deleteMany({
    where: { email: { in: [...seedEmails] } },
  });

  const users: SeedUser[] = [];
  for (const user of usersToCreate) {
    users.push(await createUser(user));
  }

  const sarah = users[0];
  const marcus = users[1];
  const aisha = users[2];

  if (!sarah || !marcus || !aisha) {
    throw new Error("Expected at least 3 seed users");
  }

  const otherUsers = users.slice(3);

  const forestPark = await prisma.post.create({
    data: {
      userId: sarah.id,
      heroImgS3Url:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
      title: "Forest Park",
      shortDescription: "Quiet trails, even on weekends",
      longDescription:
        "I come back to Forest Park whenever Portland feels too loud. Trails stay quiet even on weekends, and the mossy light feels far from the city. An hour resets your head—easy beauty I’d send a friend to.",
      type: "HIKE",
      location: "NORTHWEST",
    },
  });

  const powells = await prisma.post.create({
    data: {
      userId: marcus.id,
      heroImgS3Url:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200",
      title: "Powell's City of Books",
      shortDescription: "Get lost on purpose",
      longDescription:
        "I send everyone to Powell’s when they visit. It’s chaotic in the best way—rooms of shelves, surprise finds, and an afternoon that disappears without trying.",
      type: "BOOKSTORE",
      location: "PEARL_DISTRICT",
    },
  });

  const kens = await prisma.post.create({
    data: {
      userId: aisha.id,
      heroImgS3Url:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200",
      title: "Ken's Artisan Bakery",
      shortDescription: "Worth the morning line",
      longDescription:
        "Show up early for the kouign-amann and watch the room fill up. It’s a simple Portland ritual: good pastry, good coffee, no rush once you’re inside.",
      type: "BAKERY",
      location: "NORTHWEST",
    },
  });

  const forestParkSavers = [marcus, aisha, ...otherUsers.slice(0, 10)];
  const powellsSavers = [sarah, ...otherUsers.slice(10, 14)];
  const kensSavers = [marcus, ...otherUsers.slice(14)];

  await prisma.bookmark.createMany({
    data: [
      ...forestParkSavers.map((user) => ({
        userId: user.id,
        postId: forestPark.id,
      })),
      ...powellsSavers.map((user) => ({
        userId: user.id,
        postId: powells.id,
      })),
      ...kensSavers.map((user) => ({
        userId: user.id,
        postId: kens.id,
      })),
    ],
  });

  console.log("Seed complete.");
  console.log(`Created ${users.length} users.`);
  console.log("Log in with any seed email (password for all):");
  console.log(`  password: ${SEED_PASSWORD}`);
  console.log(`  e.g. ${usersToCreate[0].email}`);
  console.log(
    `Created posts: ${forestPark.title}, ${powells.title}, ${kens.title}`
  );
  console.log(
    `Bookmarks: Forest Park ${forestParkSavers.length}, Powell's ${powellsSavers.length}, Ken's ${kensSavers.length}`
  );
};

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
