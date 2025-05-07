export type Participant = {
  userId: number;
  userName?: string;
  profilePic: string;
};

export type EventRules = {
  participantLimit: number;
  garmentLimitPerPerson: number;
  garmentMinimumPerPerson: number;
};

export type EventType = {
  id: number;
  token: string;
  isJoined: boolean;
  eventName: string;
  createdBy: string;
  category: string;
  date: string;
  time: string;
  location: { lat: number; lng: number };
  members: { current: number; total: number };
  garments: number;
  verified: boolean;
  participants: Participant[];
  eventRules: EventRules;
  saved: boolean;
  shared: boolean;
};
