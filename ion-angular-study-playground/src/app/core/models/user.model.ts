export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface UserCompany {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  address?: UserAddress;
  company?: UserCompany;
  department?: string;
  sendInvite?: boolean;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  department: string;
  sendInvite: boolean;
}
