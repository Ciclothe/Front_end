import { useEffect, useRef, useState } from "react";
import { CardEvent } from "@/components/Event/CardEvent";
import L from "leaflet";
import { useTheme } from "@/context/ThemeContext.js";
import { Icon } from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight, mdiNavigationVariant } from "@mdi/js";
import Map, { Layer, Source, useMap } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { EventType } from "@/types/index";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";

// TODO: #97 Connect to backend to fetch events
const events = [
  {
    id: 1,
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
    isJoined: false,
    eventName: "1",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4676153, lng: -0.4039672 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
  {
    id: 2,
    token: "Wz3Yv9qP0XtLhN2BfK7dSaGeUMRpQ4wZ",
    isJoined: false,
    eventName: "2",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4911708, lng: -0.4032693 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
  {
    id: 3,
    token: "uF7mDzpXb9qY0AvnJtH3oKeMCs5gXLWR",
    isJoined: false,
    eventName: "3",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4548751, lng: -0.3530653 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
  {
    id: 4,
    token: "4NpCAq2Yu0gTFMtLZB7dKX9RxvPJsehW",
    isJoined: false,
    eventName: "4",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4807342, lng: -0.3436707 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
  {
    id: 5,
    token: "4NpCAq2Yu0gTFMtLZB7dKX9RxvPJsehW",
    isJoined: false,
    eventName: "4",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4745524, lng: -0.3864215 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
  {
    id: 6,
    token: "4NpCAq2Yu0gTFMtLZB7dKX9RxvPJsehW",
    isJoined: false,
    eventName: "4",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4565501, lng: -0.3890896 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
  {
    id: 7,
    token: "4NpCAq2Yu0gTFMtLZB7dKX9RxvPJsehW",
    isJoined: false,
    eventName: "4",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4626215, lng: -0.3705608 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
  {
    id: 8,
    token: "4NpCAq2Yu0gTFMtLZB7dKX9RxvPJsehW",
    isJoined: false,
    eventName: "4",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4721123, lng: -0.3497142 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
];

// TODO: Change this to a real user storage data
const userData = {
  id: 1,
  userName: "lielcita1230",
  profilePicture:
    "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
  sessionToken: "1234567890abcdef",
  location: {
    lat: 39.4697065,
    lng: -0.3763353,
  },
};

export const EventsView = () => {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

  const { tokenEvent } = useParams();
  const [cityGeoJSON, setCityGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const { themeMode } = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [viewState, setViewState] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
  }>({
    latitude: 39.4697065,
    longitude: -0.3763353,
    zoom: 12,
  });

  useEffect(() => {
    const fetchLocationAndBoundary = async () => {
      let lat: number;
      let lng: number;

      if (userData?.location?.lat && userData?.location?.lng) {
        lat = userData.location.lat;
        lng = userData.location.lng;
      } else {
        try {
          const res = await fetch("https://ipapi.co/json/");
          const data = await res.json();
          lat = data.latitude;
          lng = data.longitude;
        } catch {
          lat = 39.4697065;
          lng = -0.3763353;
        }
      }

      if (tokenEvent) {
        const selectedEvent = events.find(
          (event) => event.token === tokenEvent
        );
        if (selectedEvent) {
          const { lat, lng } = selectedEvent.location;
          setViewState({
            longitude: lng,
            latitude: lat,
            zoom: 15,
          });
          SetFilterEvents(lat, lng, 15);
        }
        getCityBoundary(lat, lng, true);
      } else {
        getCityBoundary(lat, lng, false);
      }
    };

    fetchLocationAndBoundary();
  }, [tokenEvent, loading]);

  const getCityBoundary = async (
    lat: number,
    lng: number,
    skipSetViewState = false
  ) => {
    try {
      const reverseUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`;
      const reverseRes = await fetch(reverseUrl);
      const reverseData = await reverseRes.json();

      const address = reverseData.address;
      const cityName = address.city || address.town || address.village;

      if (!cityName) {
        console.warn(
          "No se pudo determinar la ciudad a partir de la ubicación."
        );
        return;
      }

      const cityUrl = `https://nominatim.openstreetmap.org/search.php?q=${cityName}&polygon_geojson=1&format=jsonv2`;
      const cityRes = await fetch(cityUrl);
      const cityData = await cityRes.json();

      if (!cityData.length || !cityData[0].geojson) {
        console.warn("No se encontró geojson para la ciudad:", cityName);
        return;
      }

      const city = cityData[0];

      if (!skipSetViewState) {
        setViewState({
          latitude: parseFloat(city.lat),
          longitude: parseFloat(city.lon),
          zoom: 11,
        });
      }

      setCityGeoJSON({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: city.geojson,
            properties: {},
          },
        ],
      });
    } catch (error) {
      console.error("Error al obtener el límite de la ciudad:", error);
    }
  };

  const handleCardClick = (event: EventType) => {
    const { token, location } = event;
    navigate(`/explore/events/${token}`);
    setViewState({
      longitude: location.lng,
      latitude: location.lat,
      zoom: 15,
    });
    SetFilterEvents(location.lat, location.lng, 15);
  };

  const SetFilterEvents = (
    lat: number,
    lng: number,
    zoom: number,
    e?: mapboxgl.MapboxEvent
  ) => {
    let bounds;

    if (!e) {
      const range = 0.1 / zoom;
      bounds = L.latLngBounds(
        L.latLng(lat - range, lng - range),
        L.latLng(lat + range, lng + range)
      );
    } else {
      bounds = e.target.getBounds();
    }

    if (!bounds) return;

    const filtered = events.filter((event) => {
      const eventLatLng = L.latLng(
        Number(event.location.lat),
        Number(event.location.lng)
      );
      return bounds.contains(eventLatLng);
    });

    setFilteredEvents(filtered);
  };

  const MapEventHandler = () => {
    const { current: map } = useMap();

    useEffect(() => {
      if (map) map.resize();
    }, [map]);

    return null;
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const card = carouselRef.current.querySelector("div");
    if (!card) return;

    const cardWidth = card.clientWidth + 16;
    const carousel = carouselRef.current;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;

    if (direction === "right") {
      if (currentScroll + cardWidth >= maxScrollLeft) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (currentScroll - cardWidth <= 0) {
        carousel.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:px-0 w-full h-full md:pb-4 overflow-hidden">
      <div className="w-full h-full grid place-items-center max-h-full relative">
        {loading && (
          <div
            className={`${
              themeMode === "light" ? "bg-white" : "bg-[#222423]"
            } absolute inset-0 flex items-center justify-center z-1 rounded-xl`}
          >
            <CircularProgress size={20} sx={{ color: "#0DBC73" }} />
          </div>
        )}

        <div
          className="h-full max-w-full aspect-[16/9] md:rounded-xl overflow-hidden origin-bottom relative z-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`${
              themeMode === "dark"
                ? "bg-[#0B0B0B]/50 hover:bg-[#0B0B0B]/100"
                : "bg-white/50 hover:bg-white/100"
            } hidden p-2 cursor-pointer aspect-square absolute backdrop-blur-xs z-100 top-4 right-4 rounded-lg md:flex items-center`}
            onClick={() => {
              setViewState({
                longitude: -0.3763,
                latitude: 39.4699,
                zoom: 15,
              });
              SetFilterEvents(39.4699, -0.3763, 15);
            }}
          >
            <Icon path={mdiNavigationVariant} size={0.8} />
          </div>

          {cityGeoJSON && (
            <Map
              {...viewState}
              onMove={(e) => {
                setViewState(e.viewState);
                const { lat, lng } = e.target.getCenter();
                const zoom = e.target.getZoom();
                SetFilterEvents(lat, lng, zoom, e);
              }}
              onLoad={(e) => {
                const { lat, lng } = e.target.getCenter();
                const zoom = e.target.getZoom();
                SetFilterEvents(lat, lng, zoom, e);
                setLoading(false);
              }}
              style={{ width: "100%", height: "100%", zIndex: 10 }}
              mapStyle={
                themeMode === "light"
                  ? "mapbox://styles/mapbox/streets-v11"
                  : "mapbox://styles/mapbox/dark-v10"
              }
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              <MapEventHandler />

              {!loading && filteredEvents.length > 0 && (
                <Source
                  id="events"
                  type="geojson"
                  data={{
                    type: "FeatureCollection",
                    features: filteredEvents.map((event) => ({
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: [event.location.lng, event.location.lat],
                      },
                      properties: event,
                    })),
                  }}
                  cluster={true}
                  clusterMaxZoom={14}
                  clusterRadius={60}
                >
                  <Layer
                    id="clustered-markers"
                    type="circle"
                    paint={{
                      "circle-color": "#0DBC73",
                      "circle-radius": [
                        "step",
                        ["get", "point_count"],
                        20,
                        100,
                        30,
                        750,
                        40,
                      ],
                    }}
                  />
                  <Layer
                    id="cluster-count"
                    type="symbol"
                    layout={{
                      "text-field": "{point_count_abbreviated}",
                      "text-size": 20,
                    }}
                    paint={{
                      "text-color": "#fff",
                    }}
                  />
                </Source>
              )}

              <Source id="boundary" type="geojson" data={cityGeoJSON}>
                <Layer
                  id="boundary-fill"
                  type="fill"
                  paint={{
                    "fill-color": "#0DBC73",
                    "fill-opacity": 0.1,
                  }}
                />
                <Layer
                  id="boundary-line"
                  type="line"
                  paint={{
                    "line-color": themeMode === "light" ? "#0DBC73" : "#00D478",
                    "line-width": 2,
                  }}
                />
              </Source>
            </Map>
          )}

          {!loading && (
            <div className="absolute items-center justify-center z-10 overflow-x-hidden left-4 bottom-4 right-4">
              {filteredEvents.length !== 0 && (
                <div className="flex justify-between mb-4 items-center">
                  <div
                    className={`${
                      themeMode === "light" ? "bg-[#0B0B0B]/10" : "bg-white/10"
                    } p-2 cursor-pointer aspect-square backdrop-blur-xs z-100 top-4 right-4 rounded-lg md:hidden flex items-center`}
                    onClick={() => {
                      setViewState({
                        longitude: -0.3763,
                        latitude: 39.4699,
                        zoom: 15,
                      });
                      SetFilterEvents(39.4699, -0.3763, 15);
                    }}
                  >
                    <Icon path={mdiNavigationVariant} size={0.8} />
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`${
                        themeMode === "light"
                          ? "bg-[#0B0B0B]/10 md:bg-white/50 md:hover:bg-white/100"
                          : "bg-white/10 md:bg-[#0B0B0B]/50 md:hover:bg-[#0B0B0B]/100"
                      } p-1 rounded-lg cursor-pointer backdrop-blur-xs`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScroll("left");
                      }}
                    >
                      <Icon path={mdiChevronLeft} size={1} />
                    </div>

                    <div
                      className={`${
                        themeMode === "light"
                          ? "bg-[#0B0B0B]/10 md:bg-white/50 md:hover:bg-white/100"
                          : "bg-white/10 md:bg-[#0B0B0B]/50 md:hover:bg-[#0B0B0B]/100"
                      } p-1 rounded-lg cursor-pointer backdrop-blur-xs`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScroll("right");
                      }}
                    >
                      <Icon path={mdiChevronRight} size={1} />
                    </div>
                  </div>
                </div>
              )}

              <div
                ref={carouselRef}
                className="flex gap-4 w-full overflow-x-auto md:overflow-x-hidden scrollbar-hide"
              >
                {filteredEvents.map((event) => (
                  <CardEvent
                    key={event.id}
                    event={event}
                    onClickEvent={() => handleCardClick(event)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
