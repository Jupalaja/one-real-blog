import type { Post } from '$lib/types.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`../../posts/${params.slug}.md`)

		return {
			content: post.default,
			meta: post.metadata as Omit<Post, 'slug'>
		}
	} catch (e) {
		throw error(404, `Post ${params.slug} not found`)
	}
}
