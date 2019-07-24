import { googleKey } from "./secrets";

export const shows = [
  {
    id: 1,
    name: "Drag Roulette Show",
    description:
      "Your Friday LATE NIGHT at Mile High Hamburger Mary’s has been upgraded to hysterical! Every 1st and 3rd Friday!",
    event_url:
      "https://www.hamburgermarys.com/denver/events/event/drag-roulette-show/",
    date: "2019-07-14 15:16:38.643787",
    poster_url:
      "https://www.hamburgermarys.com/denver/wp/wp-content/uploads/2019/02/drag-roulette-1024x745.jpg",
    venue_name: "Hamburger Mary's Bar & Grille",
    venue_google_id: "1234556"
  },
  {
    id: 2,
    name: "Drag Roulette Show",
    description:
      "Your Friday LATE NIGHT at Mile High Hamburger Mary’s has been upgraded to hysterical! Every 1st and 3rd Friday!",
    event_url:
      "https://www.hamburgermarys.com/denver/events/event/drag-roulette-show/",
    date: "2019-07-14 15:16:38.643787",
    poster_url:
      "https://www.hamburgermarys.com/denver/wp/wp-content/uploads/2019/02/drag-roulette-1024x745.jpg",
    venue_name: "Hamburger Mary's Bar & Grille",
    venue_google_id: "1234556"
  },
  {
    id: 3,
    name: "Drag Roulette Show",
    description:
      "Your Friday LATE NIGHT at Mile High Hamburger Mary’s has been upgraded to hysterical! Every 1st and 3rd Friday!",
    event_url:
      "https://www.hamburgermarys.com/denver/events/event/drag-roulette-show/",
    date: "2019-07-14 15:16:38.643787",
    poster_url:
      "https://www.hamburgermarys.com/denver/wp/wp-content/uploads/2019/02/drag-roulette-1024x745.jpg",
    venue_name: "Hamburger Mary's Bar & Grille",
    venue_google_id: "1234556"
  }
];

export const venues = [
  {
    id: 1,
    venue_name: "The Clocktower Cabaret",
    venue_google_id: "ChIJASbMldp4bIcRiFeLsW3CUf4"
  },
  {
    id: 2,
    venue_name: "Mile High Hamburger Mary's",
    venue_google_id: "ChIJL4ZMpzN5bIcRe_ttaF-7N3E"
  },
  {
    id: 3,
    venue_name: "Tracks",
    venue_google_id: "ChIJU0l3jxp5bIcRcOzzQKHMBcM"
  },
  {
    id: 4,
    venue_name: "Charlie's Nightclub Denver",
    venue_google_id: "ChIJydsjLC15bIcRcnnY3EIbTgs"
  },
  {
    id: 5,
    venue_name: "Blush & Blu",
    venue_google_id: "ChIJ445gusx-bIcRDpB_himzcuY"
  },
  {
    id: 6,
    venue_name: "X BAR",
    venue_google_id: "ChIJw4sroyx5bIcR5jU8EDoneGU"
  },
  {
    id: 7,
    venue_name: "Pride and Swagger",
    venue_google_id: "ChIJCR82wSt5bIcRsu6dJbKpoX8"
  },
  {
    id: 8,
    venue_name: "Gladys",
    venue_google_id: "ChIJR9gq2Tp_bIcRrtd8dA47as8"
  },
  {
    id: 9,
    venue_name: "#VYBE",
    venue_google_id: "ChIJs4T9jil_bIcRCcy9CMKwJAA"
  }
];

export const googlePlaceURL = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=${googleKey}&input=test`;

export const placeResults = {
  predictions: [
    {
      description: "Sidetrack, North Halsted Street, Chicago, IL, USA",
      id: "4372b75566ac5bde721c6535743a061b7300f666",
      matched_substrings: [
        {
          length: 7,
          offset: 0
        }
      ],
      place_id: "ChIJkZf9mK_TD4gRZ3XmA5zo8Fw",
      reference: "ChIJkZf9mK_TD4gRZ3XmA5zo8Fw",
      structured_formatting: {
        main_text: "Sidetrack",
        main_text_matched_substrings: [
          {
            length: 7,
            offset: 0
          }
        ],
        secondary_text: "North Halsted Street, Chicago, IL, USA"
      },
      terms: [
        {
          offset: 0,
          value: "Sidetrack"
        },
        {
          offset: 11,
          value: "North Halsted Street"
        },
        {
          offset: 33,
          value: "Chicago"
        },
        {
          offset: 42,
          value: "IL"
        },
        {
          offset: 46,
          value: "USA"
        }
      ],
      types: ["bar", "point_of_interest", "establishment"]
    },
    {
      description:
        "Sidetrack Bar and Grill, East Cross Street, Ypsilanti, MI, USA",
      id: "5cb00958e28826008ec33ae56b168eeb36c337e7",
      matched_substrings: [
        {
          length: 7,
          offset: 0
        }
      ],
      place_id: "ChIJZ7r7ni-oPIgRtCnjGlIuLKA",
      reference: "ChIJZ7r7ni-oPIgRtCnjGlIuLKA",
      structured_formatting: {
        main_text: "Sidetrack Bar and Grill",
        main_text_matched_substrings: [
          {
            length: 7,
            offset: 0
          }
        ],
        secondary_text: "East Cross Street, Ypsilanti, MI, USA"
      },
      terms: [
        {
          offset: 0,
          value: "Sidetrack Bar and Grill"
        },
        {
          offset: 25,
          value: "East Cross Street"
        },
        {
          offset: 44,
          value: "Ypsilanti"
        },
        {
          offset: 55,
          value: "MI"
        },
        {
          offset: 59,
          value: "USA"
        }
      ],
      types: ["bar", "restaurant", "food", "point_of_interest", "establishment"]
    }
  ],
  status: "OK"
};

export const cleanVenues = [
  {
    venue_description: "Sidetrack, North Halsted Street, Chicago, IL, USA",
    venue_google_id: "ChIJkZf9mK_TD4gRZ3XmA5zo8Fw",
    venue_name: "Sidetrack"
  },
  {
    venue_description:
      "Sidetrack Bar and Grill, East Cross Street, Ypsilanti, MI, USA",
    venue_google_id: "ChIJZ7r7ni-oPIgRtCnjGlIuLKA",
    venue_name: "Sidetrack Bar and Grill"
  }
];
