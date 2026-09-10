import Link from "next/link";
import { type BreadcrumbItem, buildBreadcrumbJsonLd } from "@/lib/seo";

export default function Breadcrumbs({
  items,
  theme = "default",
}: {
  items: BreadcrumbItem[];
  theme?: "default" | "onImage";
}) {
  if (!items || items.length === 0) return null;
  const jsonLd = buildBreadcrumbJsonLd(items);

  const isOnImage = theme === "onImage";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`mx-auto max-w-[1140px] px-4 py-4 sm:px-6 text-xs font-medium ${
          isOnImage ? "text-white/80" : "text-[#7A7A7A]"
        }`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path + item.name} className="inline-flex items-center gap-1.5">
                {i > 0 && <span className={isOnImage ? "text-white/40" : "text-gray-300"}>/</span>}
                {isLast ? (
                  <span
                    className={`font-semibold ${isOnImage ? "text-white" : "text-[#2A302F]"}`}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={`transition-colors ${
                      isOnImage ? "text-white/80 hover:text-white" : "hover:text-[#2D903A]"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
