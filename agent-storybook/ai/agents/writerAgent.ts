import { OpenAIAgent } from "llamaindex";

export class WriterAgent extends OpenAIAgent {
    async generateStory(idea: string) {
      console.info(`Generating story for idea: ${idea}`);
        const response = await this.chat({
          message: `Write a story idea about ${idea} in 500 words. `,
        })
        return response.message.content.toString()
    }
    constructor() {
      super({
        systemPrompt: 'You are a writer trying to come up with a story idea for kids. You write intriguing story ideas that will make people want to read the book.Response should be in following format ```json\n\n{"title": "<TITLE>",\n"story": ["<para1>", "<para2>", ...]}\n\n```. Do not provide any other information other than the title and story.',
        verbose: true,
        tools: [],
      })
    }
  }
  