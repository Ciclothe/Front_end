export interface Post {
  id: number;
  postType: string;
  eventTitle?: string;
  userData: {
    id: number;
    profilePicture: string;
    username: string;
  };
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
      id: number;
      avatar: string;
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
