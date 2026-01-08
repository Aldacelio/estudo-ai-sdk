import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(){
    const {text} = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: "Explique a teoria da relatividade de forma simples.",
    });

    return Response.json({text});
}