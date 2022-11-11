import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { MouseEventHandler, useEffect } from 'react';

interface IDataItems {
  id: number,
  pictures: string[],
  title: string,
  name: string,
  address: string,
  location: {
    lat: number,
    long: number
  }
  benefits: string[],
  description: string,
  email: string,
  phone: string,
  salary: string
}

interface IData {
  data: IDataItems[]
}

export default function Home({ data }: IData) {
  // console.log(data);

  // useEffect(() => {
  //  const res =
  // }, [third])
  
  const getStars = (event: React.MouseEvent) => {
    const { value } = event.target as HTMLInputElement;
    const { id } = event.currentTarget as HTMLLIElement;
    console.log(value);
    console.log(id);
  }

  return (
    <main>
      <section className='bg-[#E6E9F2] py-7 px-64'>
         <ul>
      {data.map(({id, pictures, title, name, address, location, benefits, phone}: IDataItems) => {
        return <li key={id} className="bg-white mb-2 px-4 py-6 flex items-center" onClick={getStars} id={String(id)}>
          <div className='mr-6'>
               <Image src={pictures[0]} alt="img" width={85} height={85} className="rounded-[50%] h-[85px]" priority />
          </div>
          <div className='flex items-start flex-col w-50'>
            <span>{title}</span>
            <span>{name}</span>
            <span>{phone}</span>
          </div>
          <div className="star-rating">
      <div className="star-rating__wrap after:table after:clear-both" onClick={getStars} id={String(id)}>
        <input className="star-rating__input" id="star-rating-5" type="radio" name="rating" value="5" />
        <label className="star-rating__ico c fa fa-star-o fa-lg"  htmlFor="star-rating-5" title="5 out of 5 stars"></label>
        <input className="star-rating__input" id="star-rating-4" type="radio" name="rating" value="4" />
        <label className="star-rating__ico before:content-['\2605'] c fa fa-star-o fa-lg" htmlFor="star-rating-4" title="4 out of 5 stars"></label>
        <input className="star-rating__input" id="star-rating-3" type="radio" name="rating" value="3" />
        <label className="star-rating__ico c fa fa-star-o fa-lg" htmlFor="star-rating-3" title="3 out of 5 stars"></label>
        <input className="star-rating__input" id="star-rating-2" type="radio" name="rating" value="2" />
        <label className="star-rating__ico c fa fa-star-o fa-lg" htmlFor="star-rating-2" title="2 out of 5 stars"></label>
        <input className="star-rating__input" id="star-rating-1" type="radio" name="rating" value="1" />
        <label className="star-rating__ico c fa fa-star-o fa-lg" htmlFor="star-rating-1" title="1 out of 5 stars"></label>
            </div>
         </div>
          
        </li>
      })}
      </ul>
      </section>
    </main>
  )
}

export async function getServerSideProps() {

  const res = await axios.get("https://api.json-generator.com/templates/ZM1r0eic3XEy/data", {
    headers: {
      Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
    }
  });

  // const loc = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/50.4276926,30.4724321.json?access_token=pk.eyJ1IjoibWFya2trZWwiLCJhIjoiY2xhY2dtZXdxMDNsbDNwbnZ0ZXc5aGV6ZSJ9.nESzR0zRoJe6NJU4uW_IuA")
  // console.log(loc.data);
  const data = await res.data;
// 9.804124
  // 147.139488
  return { props: {data} };

}

// createdAt
// : 
// "2012-05-04T01:38:26.141Z"
// employment_type
// : 
// ['Full time']
// : 
// "2012-05-05T01:38:26.141Z"
