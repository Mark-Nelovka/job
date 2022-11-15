import axios from "axios";
// import Head from "next/head";
import Joblist from "../сomponents/jobList";
import { IData } from "../interfaces/dataItems";
import { useThemeContext } from "../context/context";
import { useEffect } from "react";

export default function Home({ data }: IData) {
  const ctx = useThemeContext();

  useEffect(() => {
    ctx.changeData({ data });
  }, [data, ctx]);

  return (
    <main>
      <Joblist />
    </main>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://api.json-generator.com/templates/ZM1r0eic3XEy/data",
    {
      headers: {
        Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
      },
    }
  );
  // console.log(res.data);
  // const loc = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/50.4276926,30.4724321.json?access_token=pk.eyJ1IjoibWFya2trZWwiLCJhIjoiY2xhY2dtZXdxMDNsbDNwbnZ0ZXc5aGV6ZSJ9.nESzR0zRoJe6NJU4uW_IuA")
  // console.log(loc.data);
  const data = await res.data;
  // 9.804124
  // 147.139488
  return { props: { data } };
}

// createdAt
// :
// "2012-05-04T01:38:26.141Z"
// employment_type
// :
// ['Full time']
// :
// "2012-05-05T01:38:26.141Z"
