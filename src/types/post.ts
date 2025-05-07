import { Participant } from "@/types/index";
export interface Post {
  id: number;
  postType: string;
  eventTitle?: string;
  userData: Participant;
  postData: {
    id: number;
    distance?: string;
    createdAt: string;
    condition?: string;
    title?: string;
    color?: string;
    size?: string;
    brand?: string;
    imagesOrientation?: string;
    images?: {
      id: number;
      url: string;
    }[];
  };
  imagesOrientation?: string;
  totalOffers?: number;
  liked?: boolean;
  offerSent?: boolean;
  offers?: {
    id: number;
    userData: {
      userId: number;
      profilePic: string;
    };
  }[];
  newPostsData?: {
    id: number;
    postedBy: string;
    profilePicture: string;
    condition: string;
    title: string;
    color: string;
    size: string;
    brand: string;
    imagesOrientation: string;
    mainImages: {
      id: number;
      url: string;
    };
  }[];
}
