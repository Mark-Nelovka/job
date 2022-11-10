import axios from 'axios';
import Image from 'next/image';

export default function Home({data}: any) {
  return (
    <main>
      <section className='bg-[#E6E9F2] py-7 px-64'>
         <ul>
      {data.map((item: any) => {
        return <li key={item.id} className="bg-white mb-2 px-4 py-6">
          <Image src={item.pictures[0]} alt="img" width={85} height={85} className="rounded-[50%]" priority />
          {item.address}
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

// address
// : 
// "76 Blende Jardine Place"
// benefits
// : 
// (2) ['Pay vocations', 'Flexible hours']
// createdAt
// : 
// "2012-05-04T01:38:26.141Z"
// description
// : 
// "\n  Reprehenderit Lorem consectetur non et minim adipisicing deserunt. Ipsum reprehenderit do pariatur proident esse sint magna ullamco qui minim. Anim Lorem ut laborum occaecat culpa consectetur reprehenderit aliquip ex cupidatat proident quis laborum. Nulla aute ipsum et anim.\n  \n  Responsopilities:\n    Ex qui consequat deserunt laborum cupidatat ut ullamco veniam minim nisi incididunt aliquip incididunt. Sunt sunt ullamco elit ipsum ea enim consectetur sit magna minim ea cupidatat. Et ut proident voluptate quis nulla anim commodo in pariatur ad.\n  \nCompensation & Benefits:\n\t    Incididunt et sint incididunt laboris duis. Deserunt consectetur sint aute et sint aliqua quis nostrud non elit aliqua elit tempor. Aliquip ad dolore proident eu consequat elit amet laborum aute excepteur sit labore.\n\n"
// email
// : 
// "sureplex@gmail.bo"
// employment_type
// : 
// ['Full time']
// id
// : 
// "635ee6d304601d61a71951f6"
// location
// : 
// {lat: 9.804124, long: 147.139488}
// name
// : 
// "Sureplex"
// phone
// : 
// "+97117307890"
// pictures
// : 
// (3) ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300']
// salary
// : 
// "60k-71k"
// title
// : 
// "Ut veniam occaecat aute adipisicing eiusmod non pariatur enim enim cupidatat nulla ipsum eiusmod."
// updatedAt
// : 
// "2012-05-05T01:38:26.141Z"
