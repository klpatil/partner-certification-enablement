import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Check for secret to confirm this is a valid request
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'Server configuration error: REVALIDATE_SECRET not set' },
      { status: 500 }
    );
  }

  // Validate the secret token
  const token = authHeader?.replace('Bearer ', '');
  if (token !== secret) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { tag, postId } = body;

    const hasNoTag = !tag;
    const hasNoPostId = !postId;
    if (hasNoTag && hasNoPostId) {
      return NextResponse.json(
        { error: 'Either "tag" or "postId" parameter is required' },
        { status: 400 }
      );
    }

    // If postId is provided, construct the tag
    let tagToRevalidate: string;
    if (postId) {
      tagToRevalidate = `blog-post-${postId}`;
    } else {
      tagToRevalidate = tag;
    }

    // Revalidate the cache tag
    // 'max' mode serves stale content while updating in the background
    await revalidateTag(tagToRevalidate, 'max');

    return NextResponse.json(
      {
        revalidated: true,
        tag: tagToRevalidate,
        now: Date.now(),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Error revalidating',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
