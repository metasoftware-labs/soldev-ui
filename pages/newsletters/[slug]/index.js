import fetcher from '../../../utils/fetcher';
import { Container } from '../../../components/layout';
import markdownToHtml from '../../../utils/markdown';

export async function getStaticPaths() {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`
  );

  const paths = response.map(content => {
    return {
      params: {
        slug: content.SK
      }
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const data = await fetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`);

  let content = {};

  for (let i = 0; i < data.length; i++) {
    // If ID doesn't match next
    if (params.slug !== data[i].SK) continue;

    // Save content and stop loop
    content = data[i];
    content.ContentMarkdown = await markdownToHtml(content.ContentMarkdown);
    break;
  }

  return {
    props: {
      content
    },
    revalidate: 60
  };
}

export default function Article({ content }) {
  const metaTags = {
    title: content.Title,
    description: content.Description,
    url: `https://soldev.app/newsletters/${content.SK}`,
    shouldIndex: true,
    img: content.Img
  };

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-10 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <h1 className="mx-auto flex justify-center pb-10">{content.Title}</h1>
          <p dangerouslySetInnerHTML={{ __html: content.ContentMarkdown }} />
        </div>
      </div>
    </Container>
  );
}