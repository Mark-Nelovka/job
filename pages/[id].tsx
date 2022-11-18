import { useEffect, useState } from "react";
// import { InferGetServerSidePropsType } from "next";
import Error from "next/error";
import Image from "next/image";
import data from "../data.json";
import { useThemeContext } from "../context/context";
import { IDataItems } from "../interfaces/dataItems";
import getDateCreatePost from "../General/getDateCreatePost";
import SaveIcon from "../assets/images/Save-icon.svg";
import ShareIcon from "../assets/images/Shape-icon.svg";
import ArrowBack from "../assets/images/Arrow-back-icon.svg";
import { useRouter } from "next/router";
import Map from "../сomponents/map";
// {
//   data,
//   errorCode,
// }: InferGetServerSidePropsType<typeof getServerSideProps>
export default function DetailedJob() {
  const [item, setItem] = useState<IDataItems[]>([]);
  const [error, setError] = useState(false);
  const ctx = useThemeContext();
  const location = useRouter();

  useEffect(() => {
    let findItem = null;
    const arr = [];
    arr.push(data[0]);

    setItem(arr);
    // errorCode === 200 ? setError(false) : setError(true);
    if (ctx.items && ctx.items!.length > 0) {
      findItem = ctx.items!.find((el) => el.id === location.query.id);
      const setDateItem = getDateCreatePost([findItem!]);
      setItem(setDateItem);
      return;
    }
    // if (errorCode === 200) {
    //   console.log(errorCode);
    //   findItem = data.find((el: IDataItems) => el.id === location.query.id);
    //   if (findItem) {
    //     setItem([findItem]);
    //     return;
    //   }
    //   setError(true);
    //   return;
    // }
  }, [ctx.items, location.query.id]);

  return (
    <>
      {error && <Error statusCode={404} />}
      <section>
        {item.length > 0 && (
          <div className="detailed-container">
            <div className="header-container">
              <h2 className="detailed__header-title">Job Details</h2>
              <div className="detailed__save-container">
                <SaveIcon
                  className="job-list__save-icon"
                  width="16"
                  height="20"
                  alt="save icon"
                />
                <p>Save to my list</p>
                <ShareIcon width="18" height="20" alt="share icon" />
                <p>Share</p>
              </div>
            </div>
            <div className="detailed__additional-separator"></div>
            <div className="detailed__save-container-sm">
              <SaveIcon
                className="job-list__save-icon"
                width="16"
                height="20"
                alt="save icon"
              />
              <p>Save to my list</p>
              <ShareIcon width="18" height="20" alt="share icon" />
              <p>Share</p>
            </div>

            <button className="apply-button-sm">Apply now</button>

            {item.length > 0 &&
              item.map((job) => {
                return (
                  <div key={job.id}>
                    <div className="detailed__text-title-container-sm">
                      <h2 className="detailed__text-title">{job.title}</h2>
                      <div className="detailed__sub-text-title-sm-container">
                        <p className="detailed__time-posted-sm">
                          {job.createdAt}
                        </p>
                        <div className="detailed__salary-container-sm">
                          <p>Brutto, per year</p>
                          <p>{job.salary}</p>
                        </div>
                      </div>
                    </div>
                    <div className="detailed__text-title-container">
                      <h2 className="detailed__text-title">{job.title}</h2>
                      <div className="detailed__salary-container">
                        <p>{job.salary}</p>
                        <p>Brutto, per year</p>
                      </div>
                    </div>
                    <p className="detailed__time-posted">{job.createdAt}</p>
                    <p className="detailed__info">{job.description}</p>
                    <h2 className="detailed__titles">Responsopilities</h2>
                    <div className="detailed__info">
                      <p>
                        Wellstar Medical Group, a physician-led multi-specialty
                        group in Atlanta, Georgia, is currently recruiting for a
                        BC/BE cardiothoracic surgeon to join their existing
                        cardiovascular program. This is an opportunity to play a
                        key role on a multidisciplinary team of cardiologists
                        and surgeons.
                      </p>
                      <p>
                        The ideal candidate will have five or more years of
                        experience in cardiac surgery. This candidate should be
                        facile with off-pump revascularization, complex aortic
                        surgery, minimally invasive valve and valve repair,
                        transcatheter valve replacement, surgical atrial
                        fibrillation ablation, ventricular assist device
                        placement, and extra corporeal membrane oxygenation.
                      </p>
                      <p>
                        Wellstar is one of the largest integrated healthcare
                        systems in the Southeast with 11 hospitals in Atlanta
                        metro region. With two open heart programs at Kennestone
                        Regional Medical Center and Atlanta Medical Center,
                        Wellstar cardiac surgeons perform over 1200 cardiac
                        procedures per year. The cardiac service line is the
                        only center in Georgia with the Joint Commission’s
                        Comprehensive Cardiac Center certification.
                      </p>
                    </div>
                    <h2 className="detailed__titles">
                      Compensation & Benefits:
                    </h2>
                    <ul>
                      {job.benefits.map((ben) => {
                        return (
                          <li className="detailed__benefits-item" key={ben}>
                            <div className="detailed__benefits-item--before"></div>
                            {ben}
                          </li>
                        );
                      })}
                    </ul>
                    <button className="apply-button">Apply now</button>
                    <div className="detailed__additional-info-container">
                      <h2 className="detailed__titles">Additional info</h2>
                      <div className="detailed__additional-separator"></div>
                      <p className="detailed__employment-title">
                        Employment type
                      </p>
                      <ul className="detailed__employment-list">
                        <li>Full time</li>
                        <li>Part time</li>
                        <li>Temporary</li>
                      </ul>
                      <p className="detailed__benefits-title">Benefits</p>
                      <ul className="detailed__benefits-list">
                        {job.benefits.map((ben) => {
                          return <li key={ben}>{ben}</li>;
                        })}
                      </ul>
                    </div>
                    <h2 className="detailed__titles">Attached images</h2>
                    <div className="detailed__additional-separator"></div>
                    <ul className="detailed__attached-images-list">
                      {job.pictures.map((img, i) => {
                        return (
                          <li key={i}>
                            <Image
                              src={img}
                              width="200"
                              height="300"
                              alt="Attached images"
                            />
                          </li>
                        );
                      })}
                    </ul>
                    <div className="detailed__additional-info-container-sm">
                      <h2 className="detailed__titles">Additional info</h2>
                      <div className="detailed__additional-separator"></div>
                      <p className="detailed__employment-title">
                        Employment type
                      </p>
                      <ul className="detailed__employment-list">
                        <li>Full time</li>
                        <li>Part time</li>
                        <li>Temporary</li>
                      </ul>
                      <p className="detailed__benefits-title">Benefits</p>
                      <ul className="detailed__benefits-list">
                        {job.benefits.map((ben) => {
                          return <li key={ben}>{ben}</li>;
                        })}
                      </ul>
                    </div>
                    <Map data={item} />
                  </div>
                );
              })}

            <button className="detailed__button-back-page">
              <ArrowBack width="10" height="18" />
              RETURN TO JOB BOARD
            </button>
          </div>
        )}
      </section>
    </>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch(
//     "https://api.json-generator.com/templates/ZM1r0eic3XEy/data",
//     {
//       headers: {
//         Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
//       },
//     }
//   );
//   const errorCode = res.ok ? 200 : res.status;
//   const data = await res.json();

//   return {
//     props: { errorCode, data },
//   };
// }
