export type List = {
  name: string;
  content: [];
  createdAt: string;
  description: string;
  username: string;
  _id: number;
  type?: string;
  id?: string;
  poster_path?: string;
};

export type ListToParse = {
  name: string;
  content: string;
  description: string;
  username: string;
  _id: number;
};
