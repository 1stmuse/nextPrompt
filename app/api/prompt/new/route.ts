import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const POST = async (req: any) => {
  const { prompt, tag, userId } = await req.json();

  console.log(req.json(), "Th etags");

  try {
    await connectToDb();

    const newPrompt = new Prompt({
      tag: tag,
      creator: userId,
      prompt: prompt,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error, "the errorro");
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
