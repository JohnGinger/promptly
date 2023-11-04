import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY']
})

export async function POST(req: Request) {
  const { message } = await req.json()
  const completion = await anthropic.completions.create({
    model: 'claude-2',
    max_tokens_to_sample: 10000,
    prompt: `${Anthropic.HUMAN_PROMPT} ${message} ${Anthropic.AI_PROMPT}`
  })

  return new Response(JSON.stringify(completion))
}
