import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Sparkles,
  History,
  Waves,
  Mountain,
  Building2,
  Trees,
  Heart,
  Clock3,
  X,
} from "lucide-react";

const destinations = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    emoji: "🇫🇷",
    category: "Cities",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    description:
      "Discover iconic landmarks, charming streets, world-famous museums, and unforgettable French cuisine.",
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    emoji: "🇮🇹",
    category: "History",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore ancient ruins, magnificent architecture, historic piazzas, and the heart of the Roman Empire.",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    emoji: "🇯🇵",
    category: "Cities",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience futuristic neighborhoods, traditional temples, incredible food, and vibrant Japanese culture.",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    emoji: "🇦🇪",
    category: "Cities",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience modern architecture, luxury shopping, desert adventures, and spectacular city views.",
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    emoji: "🇬🇧",
    category: "History",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    description:
      "Discover historic landmarks, royal palaces, museums, vibrant neighborhoods, and classic British culture.",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    emoji: "🇨🇭",
    category: "Mountains",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore dramatic Alpine landscapes, beautiful lakes, mountain villages, and scenic train journeys.",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    emoji: "🇮🇩",
    category: "Beaches",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Relax on tropical beaches, explore temples, discover rice terraces, and experience Balinese culture.",
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    emoji: "🇦🇺",
    category: "Beaches",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4f3d6b1b3c1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Enjoy iconic landmarks, beautiful beaches, coastal walks, and Australia's vibrant city life.",
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    emoji: "🇺🇸",
    category: "Cities",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore iconic skyscrapers, famous neighborhoods, museums, parks, and the energy of New York City.",
  },
];

const categories = [
  {
    name: "History",
    icon: History,
  },
  {
    name: "Beaches",
    icon: Waves,
  },
  {
    name: "Mountains",
    icon: Mountain,
  },
  {
    name: "Cities",
    icon: Building2,
  },
  {
    name: "Nature",
    icon: Trees,
  },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // -----------------------------------------
  // Favorites
  // -----------------------------------------

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("travelai_favorites");

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // -----------------------------------------
  // Recently explored
  // -----------------------------------------

  const [recentlyExplored, setRecentlyExplored] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "travelai_recently_explored"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // -----------------------------------------
  // Save favorites
  // -----------------------------------------

  useEffect(() => {
    localStorage.setItem(
      "travelai_favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // -----------------------------------------
  // Save recently explored
  // -----------------------------------------

  useEffect(() => {
    localStorage.setItem(
      "travelai_recently_explored",
      JSON.stringify(recentlyExplored)
    );
  }, [recentlyExplored]);

  // -----------------------------------------
  // Toggle favorite
  // -----------------------------------------

  const toggleFavorite = (destinationId) => {
    setFavorites((current) => {
      if (current.includes(destinationId)) {
        return current.filter(
          (id) => id !== destinationId
        );
      }

      return [...current, destinationId];
    });
  };

  // -----------------------------------------
  // Record destination visit
  // -----------------------------------------

  const handleDestinationClick = (destinationId) => {
    setRecentlyExplored((current) => {
      const updated = [
        destinationId,
        ...current.filter(
          (id) => id !== destinationId
        ),
      ];

      // Keep only the last 5 destinations
      return updated.slice(0, 5);
    });
  };

  // -----------------------------------------
  // Remove recent destination
  // -----------------------------------------

  const removeRecentlyExplored = (destinationId) => {
    setRecentlyExplored((current) =>
      current.filter(
        (id) => id !== destinationId
      )
    );
  };

  // -----------------------------------------
  // Filter destinations
  // -----------------------------------------

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        destination.country
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        destination.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  // -----------------------------------------
  // Recently explored destinations
  // -----------------------------------------

  const recentDestinations = recentlyExplored
    .map((id) =>
      destinations.find(
        (destination) => destination.id === id
      )
    )
    .filter(Boolean);

  // -----------------------------------------
  // Favorite destinations
  // -----------------------------------------

  const favoriteDestinations = favorites
    .map((id) =>
      destinations.find(
        (destination) => destination.id === id
      )
    )
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-600 text-white">

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm mb-6">

              <Sparkles size={16} />

              Discover your next adventure

            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">

              Explore the world

              <br />

              <span className="text-cyan-200">
                your way.
              </span>

            </h1>

            <p className="text-blue-100 text-lg mt-6 max-w-2xl leading-relaxed">

              Discover inspiring destinations, explore iconic places,
              and find your next adventure before you even start planning
              your trip.

            </p>

            {/* Search */}

            <div className="mt-8 relative max-w-2xl">

              <Search
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search destinations or countries..."
                className="w-full bg-white text-slate-900 rounded-2xl py-5 pl-14 pr-5 outline-none shadow-xl placeholder:text-slate-400"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* FAVORITES */}
      {/* ========================================= */}

      {favoriteDestinations.length > 0 && (

        <section className="max-w-7xl mx-auto px-6 pt-10">

          <div className="flex items-center gap-3 mb-5">

            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <Heart size={20} fill="currentColor" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Your favorites
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Destinations you want to remember
              </p>

            </div>

          </div>

          <div className="flex gap-4 overflow-x-auto pb-3">

            {favoriteDestinations.map(
              (destination) => (

                <Link
                  key={destination.id}
                  to={`/explore/${destination.id}`}
                  onClick={() =>
                    handleDestinationClick(
                      destination.id
                    )
                  }
                  className="min-w-[260px] group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
                >

                  <div className="relative h-36">

                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-3 left-4 text-white">

                      <div className="text-xs">
                        {destination.emoji}{" "}
                        {destination.country}
                      </div>

                      <div className="font-bold text-lg">
                        {destination.name}
                      </div>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        </section>

      )}

      {/* ========================================= */}
      {/* RECENTLY EXPLORED */}
      {/* ========================================= */}

      {recentDestinations.length > 0 && (

        <section className="max-w-7xl mx-auto px-6 pt-10">

          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Clock3 size={20} />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Recently explored
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Pick up where you left off
                </p>

              </div>

            </div>

          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">

            {recentDestinations.map(
              (destination) => (

                <div
                  key={destination.id}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 min-w-[220px]"
                >

                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <Link
                    to={`/explore/${destination.id}`}
                    onClick={() =>
                      handleDestinationClick(
                        destination.id
                      )
                    }
                    className="flex-1 min-w-0"
                  >

                    <div className="font-semibold text-slate-900">
                      {destination.name}
                    </div>

                    <div className="text-xs text-slate-500">
                      {destination.country}
                    </div>

                  </Link>

                  <button
                    onClick={() =>
                      removeRecentlyExplored(
                        destination.id
                      )
                    }
                    className="text-slate-300 hover:text-red-500 transition"
                    title="Remove"
                  >

                    <X size={16} />

                  </button>

                </div>

              )
            )}

          </div>

        </section>

      )}

      {/* ========================================= */}
      {/* CATEGORIES */}
      {/* ========================================= */}

      <section className="max-w-7xl mx-auto px-6 pt-10">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Explore by interest
            </h2>

            <p className="text-slate-500 mt-1">
              Find destinations that match your travel style.
            </p>

          </div>

        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">

          <button
            onClick={() =>
              setActiveCategory("All")
            }
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition ${
              activeCategory === "All"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-700 hover:border-indigo-300"
            }`}
          >
            🌎 All Destinations
          </button>

          {categories.map((category) => {

            const Icon = category.icon;

            return (

              <button
                key={category.name}
                onClick={() =>
                  setActiveCategory(
                    category.name
                  )
                }
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition ${
                  activeCategory === category.name
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-indigo-300"
                }`}
              >

                <Icon size={18} />

                {category.name}

              </button>

            );

          })}

        </div>

      </section>

      {/* ========================================= */}
      {/* DESTINATIONS */}
      {/* ========================================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-end justify-between mb-6">

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Popular destinations
            </h2>

            <p className="text-slate-500 mt-1">
              Start exploring places worth adding to your journey.
            </p>

          </div>

          <span className="text-sm text-slate-500">
            {filteredDestinations.length} destinations
          </span>

        </div>

        {filteredDestinations.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredDestinations.map(
              (destination) => {

                const isFavorite =
                  favorites.includes(
                    destination.id
                  );

                return (

                  <div
                    key={destination.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >

                    {/* Image */}

                    <div className="relative h-64 overflow-hidden">

                      <Link
                        to={`/explore/${destination.id}`}
                        onClick={() =>
                          handleDestinationClick(
                            destination.id
                          )
                        }
                        className="block w-full h-full"
                      >

                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                      </Link>

                      {/* Favorite */}

                      <button
                        onClick={() =>
                          toggleFavorite(
                            destination.id
                          )
                        }
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                          isFavorite
                            ? "bg-white text-red-500"
                            : "bg-black/30 text-white hover:bg-white hover:text-red-500"
                        }`}
                        title={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >

                        <Heart
                          size={19}
                          fill={
                            isFavorite
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>

                      {/* Destination title */}

                      <Link
                        to={`/explore/${destination.id}`}
                        onClick={() =>
                          handleDestinationClick(
                            destination.id
                          )
                        }
                        className="absolute bottom-5 left-5 text-white"
                      >

                        <div className="flex items-center gap-2 text-sm mb-1">

                          <span>
                            {destination.emoji}
                          </span>

                          {destination.country}

                        </div>

                        <h3 className="text-2xl font-bold">
                          {destination.name}
                        </h3>

                      </Link>

                    </div>

                    {/* Card content */}

                    <div className="p-5">

                      <div className="flex items-center justify-between mb-3">

                        <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                          {destination.category}
                        </span>

                        <Link
                          to={`/explore/${destination.id}`}
                          onClick={() =>
                            handleDestinationClick(
                              destination.id
                            )
                          }
                        >

                          <ArrowRight
                            size={18}
                            className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition"
                          />

                        </Link>

                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {destination.description}
                      </p>

                      {/* Plan trip */}

                      <Link
                        to="/upload"
                        className="mt-5 flex items-center justify-center gap-2 w-full bg-indigo-50 text-indigo-600 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-600 hover:text-white transition"
                      >
                        Plan a trip to {destination.name}
                      </Link>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        ) : (

          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-16 text-center">

            <div className="text-5xl mb-4">
              🌍
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No destinations found
            </h3>

            <p className="text-slate-500 mt-2">
              Try searching for another destination.
            </p>

          </div>

        )}

      </section>

      {/* ========================================= */}
      {/* BOTTOM CTA */}
      {/* ========================================= */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <Sparkles size={20} />

              <span className="font-semibold">
                Ready to travel?
              </span>

            </div>

            <h2 className="text-3xl font-bold">
              Turn your destination into a complete trip.
            </h2>

            <p className="text-blue-100 mt-2">
              Upload your booking and let TravelAI build your itinerary.
            </p>

          </div>

          <Link
            to="/upload"
            className="bg-white text-indigo-700 px-7 py-3.5 rounded-xl font-semibold hover:scale-105 transition whitespace-nowrap"
          >
            Plan a Trip →
          </Link>

        </div>

      </section>

    </div>
  );
}