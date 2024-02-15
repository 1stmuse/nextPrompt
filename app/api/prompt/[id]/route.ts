import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (res, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompts not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompt prompts", { status: 500 });
  }
};

export const PATCH = async (res, { params }) => {
  const { tag, prompt } = await res.json();

  try {
    await connectToDb();
    const existingPrompts = await Prompt.findById(params.id);
    if (!existingPrompts) {
      return new Response("Prompts not found", { status: 404 });
    }

    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;

    await existingPrompts.save();

    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (res, { params }) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted succesfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
