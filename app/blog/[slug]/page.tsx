import { permanentRedirect } from "next/navigation";

// A pure redirect with no data dependency — nothing here needs to be
// dynamic at all, let alone forced fresh on every request.
// Empty list = nothing prebuilt at deploy time; each page is rendered on its
// first request, then served from cache until an admin save purges it.
// Without this export Next 14 renders the route dynamically (a Neon query on
// every hit).
export async function generateStaticParams() {
  return [];
}

export default async function BlogSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  permanentRedirect(`/${params.slug}`);
}
