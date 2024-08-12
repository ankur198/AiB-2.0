import Together from "together-ai";
import { togetherKey } from "./key";

export const generateImgaes = async (prompt: string) => {
    const together = new Together({ apiKey: togetherKey });

    const response = await together.images.create({
        // model: "stabilityai/stable-diffusion-2-1",
        // model: "SG161222/Realistic_Vision_V3.0_VAE",
        // model: "runwayml/stable-diffusion-v1-5",
        // model: "stabilityai/stable-diffusion-xl-base-1.0",
        model: "prompthero/openjourney",
        prompt: prompt,
        width: 512,
        height: 512,
        steps: 40,
        n: 1,
        seed: 1842
    });
    return response.data;
};
