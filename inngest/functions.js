import { inngest } from "./client";

// inngest function to create user
export const syncUserCreation = inngest.createFunction(
  {
    id: "sunc-user-create",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// inngest function to update user

export const syncUserUpdate = inngest.createFunction(
  {
    id: "sunc-user-update",
  },
  { event: "clerk/user.update" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// inngest function to delete user

export const syncUserDelate = inngest.createFunction(
  {
    id: "sunc-user-delete",
  },
  { event: "clerk/user.delete" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: { id: data.id },
    });
  }
);
