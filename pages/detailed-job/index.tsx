import { useEffect, useState } from "react";
import Image from "next/image";
import { useThemeContext } from "../../context/context";
import SaveIcon from "../../assets/images/Save-icon.svg";
import ShareIcon from "../../assets/images/Shape-icon.svg";
import ArrowBack from "../../assets/images/Arrow-back-icon.svg";
import data from "../../data.json";
import { IDataItems } from "../../interfaces/dataItems";

export default function DetailedJob() {
  const [item, setItem] = useState<IDataItems[]>([]);
  const ctx = useThemeContext();

  useEffect(() => {
    const never = [];
    if (data) {
      never.push(data[0]);
      setItem(never);
      console.log(data[0]);
    }
  }, []);

  return (
    <section>
      <div className="detailed-container">
        <div className="header-container">
          <p>Job Details</p>
          <div>
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

        <button className="apply-button">Apply now</button>

        {item.length &&
          item.map((job) => {
            return (
              <div key={job.id} className="">
                <div className="detailed__title">
                  <h2>{job.title}</h2>
                  <div className="detailed__salary-container">
                    <p>{job.salary}</p>
                    <p>Brutto, per year</p>
                  </div>
                </div>
                <p className="detailed__time-posted">{job.createdAt}</p>
                <p>{job.description}</p>
                <h2 className="detailed__text-title">Responsopilities</h2>
                <div className="detailed__info-container">
                  <p>
                    Wellstar Medical Group, a physician-led multi-specialty
                    group in Atlanta, Georgia, is currently recruiting for a
                    BC/BE cardiothoracic surgeon to join their existing
                    cardiovascular program. This is an opportunity to play a key
                    role on a multidisciplinary team of cardiologists and
                    surgeons.
                  </p>
                  <p>
                    The ideal candidate will have five or more years of
                    experience in cardiac surgery. This candidate should be
                    facile with off-pump revascularization, complex aortic
                    surgery, minimally invasive valve and valve repair,
                    transcatheter valve replacement, surgical atrial
                    fibrillation ablation, ventricular assist device placement,
                    and extra corporeal membrane oxygenation.
                  </p>
                  <p>
                    Wellstar is one of the largest integrated healthcare systems
                    in the Southeast with 11 hospitals in Atlanta metro region.
                    With two open heart programs at Kennestone Regional Medical
                    Center and Atlanta Medical Center, Wellstar cardiac surgeons
                    perform over 1200 cardiac procedures per year. The cardiac
                    service line is the only center in Georgia with the Joint
                    Commission’s Comprehensive Cardiac Center certification.
                  </p>
                </div>
                <h2 className="detailed__text-title">
                  Compensation & Benefits:
                </h2>
                <ul>
                  {job.benefits.map((ben) => {
                    return (
                      <li className="detailed__benefits-item" key={ben}>
                        {ben}
                      </li>
                    );
                  })}
                </ul>
                <button className="apply-button">Apply now</button>
                <h2 className="detailed__additional-title">Additional info</h2>
                <div className="detailed__additional-separator"></div>
                <p>Employment type</p>
                <ul className="detailed__employment-list">
                  <li>Full time</li>
                  <li>Part time</li>
                  <li>Temporary</li>
                </ul>
                <p>Benefits</p>
                <ul className="detailed__benefits-list">
                  {job.benefits.map((ben) => {
                    return <li key={ben}>{ben}</li>;
                  })}
                </ul>
                <h2 className="detailed__additional-title">Attached images</h2>
                <div className="detailed__additional-separator"></div>
                <ul className="detailed__attached-images-list">
                  {job.pictures.map((img, i) => {
                    return (
                      <li key={i}>
                        <Image
                          src={img}
                          width="200"
                          height="116"
                          alt="Attached images"
                        />
                      </li>
                    );
                  })}
                </ul>
                <button className="detailed__button-back-page">
                  <ArrowBack width="10" height="18" />
                  RETURN TO JOB BOARD
                </button>
              </div>
            );
          })}
      </div>
    </section>
  );
}
