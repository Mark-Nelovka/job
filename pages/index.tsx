import axios from 'axios';
import Image from 'next/image';
import { type } from 'os';

interface IData {
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

interface Tqe {
  data: IData[]
}

export default function Home({ data }: Tqe) {
  console.log(data);
//   new google.maps.Geocoder().geocode({
//   'latLng': new google.maps.LatLng(12.9715987, 77.594562699)
// }, function(results, status) {
//   if (status == google.maps.GeocoderStatus.OK) {
//     console.log(results);
//   }
// });
  return (
    <main>
      <section className='bg-[#E6E9F2] py-7 px-64'>
         <ul>
      {data.map(({id, pictures, title, name, address, location, benefits, phone}: IData) => {
        return <li key={id} className="bg-white mb-2 px-4 py-6 flex items-center">
          <div className='mr-6'>
               <Image src={pictures[0]} alt="img" width={85} height={85} className="rounded-[50%] h-[85px]" priority />
          </div>
          <div className='flex flex-col items-start'>
            <span>{title}</span>
            <span>{name}</span>
            <span>{phone}</span>
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

  const data = await res.data;

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
