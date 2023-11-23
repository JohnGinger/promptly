/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	ANTHROPIC_API_KEY: string;
	ANTHROPIC_API_KEY_FREE_ONE: string;
	ANTHROPIC_API_KEY_FREE_TWO: string;
	ANTHROPIC_API_KEY_FREE_THREE: string;

	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		// let origin =  'https://www.trypromptme.com'

	
		const CORS_HEADERS = {
			'Access-Control-Allow-Origin': 'https://www.trypromptme.com',
			'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method == 'OPTIONS') {
			return new Response('', {
				headers: CORS_HEADERS,
			});
		}

		let free_keys = [env.ANTHROPIC_API_KEY_FREE_ONE, env.ANTHROPIC_API_KEY_FREE_TWO, env.ANTHROPIC_API_KEY_FREE_THREE];

		free_keys.sort(() => Math.random() - 0.5);

		for (let key of free_keys) {
			try {
				const anthropic = new Anthropic({
					apiKey: key,
				});

				const { message } = await request.json<{ message: string }>();
				const completion = await anthropic.completions.create({
					model: 'claude-2',
					max_tokens_to_sample: 1000,
					prompt: `${Anthropic.HUMAN_PROMPT} ${message} ${Anthropic.AI_PROMPT}`,
				});
				console.log('Used free key')
				return new Response(JSON.stringify(completion), {
					headers: CORS_HEADERS,
				});
			} catch (e) {
				console.log('do nothing');
			}
		}

		const anthropic = new Anthropic({
			apiKey: env.ANTHROPIC_API_KEY,
		});

		const { message } = await request.json<{ message: string }>();
		const completion = await anthropic.completions.create({
			model: 'claude-2',
			max_tokens_to_sample: 1000,
			prompt: `${Anthropic.HUMAN_PROMPT} ${message} ${Anthropic.AI_PROMPT}`,
		});
		console.log('Used paid key')

		return new Response(JSON.stringify(completion), {
			headers: CORS_HEADERS,
		});
	},
};
