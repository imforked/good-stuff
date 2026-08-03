import "dotenv/config";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import type { PostLocation, PostType } from "../../shared/constants";

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

type SeedPostInput = {
  authorIndex: number;
  heroImgS3Url: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  type: PostType;
  location: PostLocation;
  /** Indexes into `users` for who bookmarks this post (must not include author). */
  saverIndexes: number[];
};

const postsToCreate: SeedPostInput[] = [
  {
    authorIndex: 0,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    title: "Forest Park",
    shortDescription: "Quiet trails, even on weekends",
    longDescription:
      "I come back to Forest Park whenever Portland feels too loud. Trails stay quiet even on weekends, and the mossy light feels far from the city. An hour resets your head—easy beauty I’d send a friend to.",
    type: "HIKE",
    location: "NORTHWEST",
    saverIndexes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    authorIndex: 1,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200",
    title: "Powell's City of Books",
    shortDescription: "Get lost on purpose",
    longDescription:
      "I send everyone to Powell’s when they visit. It’s chaotic in the best way—rooms of shelves, surprise finds, and an afternoon that disappears without trying.",
    type: "BOOKSTORE",
    location: "PEARL_DISTRICT",
    saverIndexes: [0, 13, 14, 15, 16],
  },
  {
    authorIndex: 2,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200",
    title: "Ken's Artisan Bakery",
    shortDescription: "Worth the morning line",
    longDescription:
      "Show up early for the kouign-amann and watch the room fill up. It’s a simple Portland ritual: good pastry, good coffee, no rush once you’re inside.",
    type: "BAKERY",
    location: "NORTHWEST",
    saverIndexes: [1, 17, 18, 19],
  },
  {
    authorIndex: 3,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",
    title: "Heart Coffee on SE Division",
    shortDescription: "Bright light, clean cups",
    longDescription:
      "When I need a reset between errands, Heart on Division is the move. Big windows, careful coffee, and enough space to think without feeling rushed out the door.",
    type: "COFFEE_SHOP",
    location: "DIVISION",
    saverIndexes: [0, 4, 8, 12],
  },
  {
    authorIndex: 4,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
    title: "Kann",
    shortDescription: "Haitian flavors, unforgettable",
    longDescription:
      "Kann is the dinner I’d book for someone visiting. Bold Haitian cooking, warm service, and a room that feels special without being stiff—save room for dessert.",
    type: "RESTAURANT",
    location: "SOUTHEAST",
    saverIndexes: [2, 5, 9, 11, 15],
  },
  {
    authorIndex: 5,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
    title: "Mt. Tabor Park",
    shortDescription: "Sunset over the reservoirs",
    longDescription:
      "Walk the volcano loops at golden hour and watch the city go soft from the top. Easy, local, and somehow still a surprise every time I go.",
    type: "PARK",
    location: "MT_TABOR",
    saverIndexes: [1, 3, 6, 10, 14, 18],
  },
  {
    authorIndex: 6,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200",
    title: "Bar Casa Vale",
    shortDescription: "Spanish small plates, late",
    longDescription:
      "For a night that stretches, Casa Vale delivers: vermouth, tapas, and a room that stays lively without tipping into chaos. Go with friends who like to share.",
    type: "BAR",
    location: "NORTHEAST",
    saverIndexes: [0, 7, 13, 16],
  },
  {
    authorIndex: 7,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
    title: "Portland Japanese Garden",
    shortDescription: "Quiet in the middle of town",
    longDescription:
      "The Japanese Garden is my reset button. Paths, water, and that hush you forget exists in a city—worth the ticket whenever you need to disappear for an hour.",
    type: "GARDEN",
    location: "NORTHWEST",
    saverIndexes: [2, 4, 8, 12, 19],
  },
  {
    authorIndex: 8,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200",
    title: "Proud Mary",
    shortDescription: "Aussie brunch energy",
    longDescription:
      "Proud Mary is loud in a good way—flat whites, avocado situations, and a line that moves. Bring patience and someone you actually want to talk to.",
    type: "COFFEE_SHOP",
    location: "ALBERTA_ARTS",
    saverIndexes: [1, 5, 9, 17],
  },
  {
    authorIndex: 9,
    heroImgS3Url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200",
    title: "Mississippi Studios",
    shortDescription: "Small room, big nights",
    longDescription:
      "Catch a show at Mississippi Studios when you can. Intimate stage, solid sound, and that neighborhood bar feeling before and after—Portland live music at its best.",
    type: "LIVE_MUSIC",
    location: "NORTH",
    saverIndexes: [0, 3, 6, 11, 14, 18],
  },
];

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

  if (users.length < 10) {
    throw new Error("Expected at least 10 seed users");
  }

  const posts = [];
  for (const postInput of postsToCreate) {
    const author = users[postInput.authorIndex];
    if (!author) {
      throw new Error(`Missing author at index ${postInput.authorIndex}`);
    }

    const post = await prisma.post.create({
      data: {
        userId: author.id,
        heroImgS3Url: postInput.heroImgS3Url,
        title: postInput.title,
        shortDescription: postInput.shortDescription,
        longDescription: postInput.longDescription,
        type: postInput.type,
        location: postInput.location,
      },
    });

    posts.push({ post, saverIndexes: postInput.saverIndexes });
  }

  await prisma.bookmark.createMany({
    data: posts.flatMap(({ post, saverIndexes }) =>
      saverIndexes.map((saverIndex) => {
        const saver = users[saverIndex];
        if (!saver) {
          throw new Error(`Missing saver at index ${saverIndex}`);
        }

        return {
          userId: saver.id,
          postId: post.id,
        };
      })
    ),
  });

  console.log("Seed complete.");
  console.log(`Created ${users.length} users.`);
  console.log("Log in with any seed email (password for all):");
  console.log(`  password: ${SEED_PASSWORD}`);
  console.log(`  e.g. ${usersToCreate[0].email}`);
  console.log(`Created ${posts.length} posts:`);
  for (const { post, saverIndexes } of posts) {
    console.log(`  - ${post.title} (${saverIndexes.length} bookmarks)`);
  }
};

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
