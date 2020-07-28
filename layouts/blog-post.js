export default function BlogPostLayout(frontMatterData) {
  return ({ children: content }) => {
    return (
      <main className="max-w-2xl mx-auto px-4 mt-4 sm:mt-12 sm:px-6 xl:max-w-3xl xl:px-0">
        <article className="mx-auto">
          <header className="py-6 lg:pb-8 xl:pb-10">
            <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-4xl md:leading-10 md:font-bold">
              {frontMatterData.title}
            </h1>
            <div className="flex items-center text-sm pt-4 pb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/avatar-darin.jpeg" alt="Darin's profile image" />
              </div>
              <div className="flex flex-col pl-4">
                <span className="text-gray-600 font-medium">
                  {frontMatterData.author}
                </span>
                <span className="text-gray-600">
                  <time dateTime={frontMatterData.publishedOn}>
                    {frontMatterData.publishedOnFriendly}
                  </time>{" "}
                  &middot; {frontMatterData.readTime} read
                </span>
              </div>
            </div>
          </header>

          <div className="prose lg:prose-xl">{content}</div>
        </article>
      </main>
    );
  };
}
