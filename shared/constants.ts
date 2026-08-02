export const DISPLAY_NAME_MAX_CHAR = 20;

export const POST_TITLE_MAX_CHAR = 100;
export const POST_SHORT_DESCRIPTION_MAX_CHAR = 40;
export const POST_LONG_DESCRIPTION_MAX_CHAR = 200;

export const POST_TYPES = [
  "RESTAURANT",
  "COFFEE_SHOP",
  "BAKERY",
  "BAR",
  "BREWERY",
  "WINERY",
  "FOOD_CART",
  "DESSERT",
  "HIKE",
  "PARK",
  "GARDEN",
  "VIEWPOINT",
  "BEACH",
  "WATERFALL",
  "CAMPING",
  "GALLERY",
  "MUSEUM",
  "MURAL",
  "BOOKSTORE",
  "LIVE_MUSIC",
  "CONCERT",
  "COMEDY",
  "THEATER",
  "MOVIE",
  "FESTIVAL",
  "EVENT",
  "ARCADE",
  "SHOP",
  "VINTAGE_STORE",
  "RECORD_STORE",
  "FARMERS_MARKET",
  "BIKE_RIDE",
  "RUNNING_ROUTE",
  "CLIMBING_GYM",
  "GYM",
  "YOGA",
  "SPA",
  "ALBUM",
  "SONG",
  "PLAYLIST",
  "PODCAST",
  "BOOK",
  "TV_SHOW",
  "VIDEO_GAME",
  "BOARD_GAME",
  "AIRBNB",
  "HOTEL",
  "DAY_TRIP",
  "ROAD_TRIP",
  "DOG_FRIENDLY",
  "FAMILY_ACTIVITY",
  "DATE_IDEA",
  "HIDDEN_GEM",
] as const;

export const POST_LOCATIONS = [
  // Regions
  "NORTH",
  "NORTHEAST",
  "NORTHWEST",
  "SOUTH",
  "SOUTHEAST",
  "SOUTHWEST",

  // Central
  "DOWNTOWN",
  "PEARL_DISTRICT",
  "OLD_TOWN_CHINATOWN",
  "SOUTH_WATERFRONT",

  // North
  "ST_JOHNS",
  "CATHEDRAL_PARK",
  "PORTSMOUTH",
  "UNIVERSITY_PARK",
  "KENTON",

  // Northeast
  "ALBERTA_ARTS",
  "CONCORDIA",
  "BEAUMONT_WILSHIRE",
  "HOLLYWOOD",
  "ROSEWAY",
  "CULLY",
  "IRVINGTON",
  "SABIN",
  "KING",

  // Northwest
  "NOB_HILL",
  "SLABTOWN",
  "FOREST_PARK",

  // Southeast
  "HAWTHORNE",
  "DIVISION",
  "BELMONT",
  "BUCKMAN",
  "MT_TABOR",
  "SELLWOOD_MORELAND",
  "REED",
  "LADD_ADDITION",
  "CRESTON_KENILWORTH",
  "WOODSTOCK",
  "MONTAVILLA",

  // Southwest
  "HILLSDALE",
  "MULTNOMAH_VILLAGE",
  "SOUTHWEST_HILLS",

  // East Portland
  "GATEWAY",
  "PARKROSE",
  "LENTS",
  "POWELLHURST_GILBERT",
  "ARGAY",
] as const;

export type PostType = (typeof POST_TYPES)[number];
export type PostLocation = (typeof POST_LOCATIONS)[number];