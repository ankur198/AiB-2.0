import { OpenAIAgent } from "llamaindex";
import { getImagePrompt } from "./artistTools/getImagePrompt";
import { Story } from "../..";

export class ArtistAgent extends OpenAIAgent {
  async getImagePrompt(arg0: { theme: string; paragraph: string; }) {
    const response = await this.chat({
      message: `Based on the the given paragraph from a story and theme of overall story. Write a prompt that can be used with stable-diffusion to generate illustrations for the paragraph\n\nPARAGRAPH: ${arg0.paragraph}\n\nTHEME: ${arg0.theme}\n\nWrite the output as: \nPROMPT:<prompt for sd>`,
    })

    const prompt = response.message.content.toString().split('PROMPT:')[1].trim()
    return prompt
  }

  async getTheme(story: Story) {
    const response = await this.chat({
      message: `Understand the theme of the story. We are going to generate images using stable diffusion. Figure out keywords that should be kept common for the whole story.\n\nTITLE: ${story.title}\n\nSTORY: ${story.story.join('\n')}. Provide output as \`\`\`json\n\n{"theme": "<theme>"}\n\n\`\`\``,
    })
    return response.message.content.toString().split('```json')[1].split('```')[0].trim()
  }

  constructor() {
    super({
      systemPrompt: 'You are a artist trying to tell stories through your art. You create art that will make people feel emotions and think deeply about the world.',
      verbose: true,
      tools: [getImagePrompt],
    })
  }
}

