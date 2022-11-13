export interface IDataItems {
  id: number;
  pictures: string[];
  title: string;
  name: string;
  address: string;
  location: {
    lat: number;
    long: number;
  };
  benefits: string[];
  description: string;
  email: string;
  phone: string;
  salary: string;
}

export interface IData {
  data: IDataItems[];
}

