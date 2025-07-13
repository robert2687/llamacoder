import Together from "together-ai"

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY
  })

  const response = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content: `You are a React code generator. Generate a complete React component based on the user's request. 
        
Rules:
- Use TypeScript and Tailwind CSS
- Import React hooks if needed
- Make it interactive and functional
- Use shadcn/ui components when appropriate
- Return ONLY the React component code, no explanations
- Use this format: export default function ComponentName() { ... }`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2,
    max_tokens: 2000
  })

  const code = response.choices[0]?.message?.content || ""

  return Response.json({ code })
}

export const runtime = "edge"