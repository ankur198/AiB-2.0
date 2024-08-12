import { FunctionTool, Settings } from "llamaindex";

const generateImagePrompt = async ({ theme, paragraph }: { theme: string; paragraph: string }) => {
    const response = await Settings.llm.chat({
        messages: [
            { role: 'system', content: 'Based on the the given paragraph from a story and theme of overall story. Write a prompt that can be used with stable-diffusion to generate illustrations for the paragraph' },
            { role: 'user', content: `\nPARAGRAPH: ${paragraph}\n\nTHEME: ${theme}\n\nWrite the output as: \nPROMPT:<prompt for sd>` }
        ]
    });
    const prompt = response.message.content.toString();
    return prompt;
};

export const getImagePrompt = new FunctionTool(generateImagePrompt, {
    name: 'Get Image Prompt',
    description: 'Based on the the given paragraph from a story and theme of overall story. Use this tool to write a prompt that can be used with stable-diffusion to generate illustrations for the paragraph',
    parameters: {
        type: 'object',
        properties: {
            theme: {
                type: 'string',
                description: 'The theme of the story.'
            },
            paragraph: {
                type: 'string',
                description: 'The paragraph from the story.'
            }
        },
        required: ['theme', 'paragraph']
    }
});

