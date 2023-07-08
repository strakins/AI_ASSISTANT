// Route to handle 3 functions
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET(read)
export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response('Failed to Fetch all post',{
            status: 500
        })
    }
}

// PATCH(update)
export const PATCH = async (req, {params}) => {
    const { prompt, tag } = await req.json();

    try {
        
        await connectToDB();

        const exisitingPrompt = await Prompt.findById(params.id);
        if(!exisitingPrompt) return new Response("Promp not Found", { status: 404 })
        
        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;

        await exisitingPrompt.save();

        return new Response(JSON.stringify(exisitingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 })
    }
}

// DELETE(delete)

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 })        

    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}