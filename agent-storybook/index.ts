import { TogetherLLM, Settings } from "llamaindex";
import { togetherKey } from "./key";
import { WriterAgent } from "./ai/agents/writerAgent";
import * as fs from 'fs';
import { ArtistAgent } from "./ai/agents/artistAgent";
import { generateImgaes } from "./generateImgaes";

export type Story = {
    title: string;
    story: string[];
};

export type Theme = {
    theme: string;
};

Settings.llm = new TogetherLLM({ model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', temperature: 0, apiKey: togetherKey });

const writerAgent = new WriterAgent();
const artistAgent = new ArtistAgent();

async function main() {
    const story = await writerAgent.generateStory("Rabbit and turtle race");

    fs.writeFileSync('story.json', JSON.stringify(JSON.parse(story), null, 4));

    const storyObj = JSON.parse(fs.readFileSync('story.json').toString()) as Story;

    const theme = await artistAgent.getTheme(storyObj);

    fs.writeFileSync('theme.json', theme);

    const themeObj = JSON.parse(fs.readFileSync('theme.json').toString()) as Theme;

    const prompts = [] as string[];
    for (let i = 0; i < storyObj.story.length; i++) {
        const paragraph = storyObj.story[i];
        console.log(`Processing paragraph ${i + 1} of ${storyObj.story.length}`);
        const prompt = await artistAgent.getImagePrompt({ theme: themeObj.theme, paragraph });
        prompts.push(prompt);
    }

    fs.writeFileSync('prompts.json', JSON.stringify(prompts, null, 4));

    const promptsObj = JSON.parse(fs.readFileSync('prompts.json').toString()) as string[];

    fs.mkdirSync('images', { recursive: true });

    for (let i = 0; i < promptsObj.length; i++) {
        const prompt = promptsObj[i];
        console.log(`Generating image ${i + 1} of ${promptsObj.length}`);
        const imageBase64 = await generateImgaes(prompt);
        for (let j = 0; j < imageBase64.length; j++) {
            const buffer = Buffer.from(imageBase64[j].b64_json, 'base64');
            fs.writeFileSync(`images/image${i + 1}_${j + 1}.png`, buffer);
        }
    }
}

main();
