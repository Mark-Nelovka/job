import { InferGetServerSidePropsType } from "next";
import Error from "next/error";
import Joblist from "../сomponents/jobList";
import { useThemeContext } from "../context/context";
import { useEffect } from "react";
import Loader from "../сomponents/loader";

export default function Home({
  errorCode,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const ctx = useThemeContext();

  useEffect(() => {
    if (errorCode === 200) {
      ctx.changeData({ data });
      return;
    }
  }, [ctx, data, errorCode]);

  return (
    <main>
      {errorCode !== 200 ? <Error statusCode={errorCode} /> : <Joblist />}
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.json-generator.com/templates/ZM1r0eic3XEy/data",
    {
      headers: {
        Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
      },
    }
  );
  const errorCode = res.ok ? 200 : res.status;
  const data = await res.json();

  return {
    props: { errorCode, data },
  };
}
