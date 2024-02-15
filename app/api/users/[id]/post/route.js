import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (res, { params }) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find({ creator: params?.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompt prompts", { status: 500 });
  }
};
