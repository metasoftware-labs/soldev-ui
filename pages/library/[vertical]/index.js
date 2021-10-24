import Head from "next/head";
import Videos from "../../../components/videos";
import fetcher from "../../../utils/fetcher";
import verticals from "../../../utils/verticals";

export async function getStaticPaths() {
  const paths = verticals.map((type) => {
    return { params: { vertical: type } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const playlists = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${params.vertical}`
  );

  return {
    props: {
      playlists,
    },
    revalidate: 60, // In seconds
  };
}

export default function Video({ playlists }) {
  return (
    <div>
      <Head>
        <title>SolDev</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Videos playlists={playlists} />
    </div>
  );
}