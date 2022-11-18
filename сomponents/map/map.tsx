import { IData } from "../../interfaces/dataItems";
import LocalIcon from "../../assets/images/Location-icon.svg";

export const Map = (data: IData) => {
  return (
    <div className="map__container">
      <h2 className="map__title">Contacts</h2>
      <div className="map__title-separator"></div>

      <ul className="map-list">
        {data.data.map(({ id, name, title, phone, email }) => {
          return (
            <li key={id}>
              <div className="map__title-container">
                <p>{name}</p>
                <p>{title}</p>
              </div>
              <div>
                <p className="map__location-container">
                  <span>
                    <LocalIcon width={13} height={18} alt="location icon" />
                  </span>
                  <span>Vienna, Austria</span>
                </p>
              </div>
              <div className="map__links-container">
                <p>
                  <a href={`tel:${phone}`}>{phone}</a>
                </p>
                <p>
                  <a target="_blank" href={`mailto:${email}`} rel="noreferrer">
                    {email}
                  </a>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <iframe
        title="Campus"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6103.938294607758!2d-74.23079022389726!3d40.09840081761352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c178a380d7effd%3A0x151bbae2ec9fbe04!2zOTAwIExha2V3b29kIEF2ZSwgTGFrZXdvb2QsIE5KIDA4NzAxLCDQodC_0L7Qu9GD0YfQtdC90ZYg0KjRgtCw0YLQuCDQkNC80LXRgNC40LrQuA!5e0!3m2!1suk!2sua!4v1663759734805!5m2!1suk!2sua"
        width="100%"
        height="218"
        loading="lazy"
        allowFullScreen={false}
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
