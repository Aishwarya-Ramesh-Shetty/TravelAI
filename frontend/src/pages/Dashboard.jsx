import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import {
  Plus,
  MapPin,
  Calendar,
  ArrowRight,
  Plane,
  Globe,
  Clock3,
  Sparkles,
  Check,
  ClipboardCheck,
  RotateCcw,
  Hotel,
  ListChecks
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Dashboard() {

  const checklistItems = [
    {
      id: "passport",
      label: "Passport / ID",
    },
    {
      id: "tickets",
      label: "Flight tickets",
    },
    {
      id: "hotel",
      label: "Hotel confirmation",
    },
    {
      id: "insurance",
      label: "Travel insurance",
    },
    {
      id: "money",
      label: "Currency / payment",
    },
    {
      id: "charger",
      label: "Chargers & power bank",
    },
    {
      id: "medicines",
      label: "Medicines",
    },
    {
      id: "packing",
      label: "Pack clothes",
    },
    {
      id: "documents",
      label: "Important documents",
    },
    {
      id: "weather",
      label: "Check weather",
    },
  ];

  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem("travelai-checklist");
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem(
      "travelai-checklist",
      JSON.stringify(completedItems)
    );
  }, [completedItems]);

  const toggleChecklistItem = (id) => {
    setCompletedItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const completedCount = completedItems.length;

  const checklistProgress = Math.round(
    (completedCount / checklistItems.length) * 100
  );

  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await api.get('/trips');
      return data;
    }
  });


  const totalTrips = trips?.length || 0;

  const countries = [
    ...new Set(
      trips?.map((trip) => trip.destination.split(",").pop().trim())
    ),
  ];

  const upcomingTrips =
    trips?.filter(
      (trip) => new Date(trip.startDate) > new Date()
    ).length || 0;

  const totalTravelDays =
    trips?.reduce((sum, trip) => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);

      return (
        sum +
        Math.ceil(
          (end - start) / (1000 * 60 * 60 * 24)
        ) +
        1
      );
    }, 0) || 0;


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrip = trips
    ?.filter((trip) => trip.startDate)
    .sort(
      (a, b) =>
        new Date(a.startDate) - new Date(b.startDate)
    )[0];

  const daysUntilTrip = upcomingTrip
    ? Math.max(
      0,
      Math.ceil(
        (new Date(upcomingTrip.startDate) - new Date()) /
        (1000 * 60 * 60 * 24)
      )
    )
    : 0;

  const upcomingTripDays = upcomingTrip
    ? Math.ceil(
      (
        new Date(upcomingTrip.endDate) -
        new Date(upcomingTrip.startDate)
      ) /
      (1000 * 60 * 60 * 24)
    ) + 1
    : 0;

  const upcomingPlaces =
    upcomingTrip?.itinerary?.days?.reduce(
      (total, day) =>
        total + (day.activities?.length || 0),
      0
    ) || 0;

  const upcomingFlights =
    upcomingTrip?.extractedData?.flights?.length || 0;

  const upcomingHotels =
    upcomingTrip?.extractedData?.hotels?.length || 0;

  const tripStarted =
    upcomingTrip &&
    new Date(upcomingTrip.startDate) <= new Date();






  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white p-10 mb-10">

          <div className="absolute top-0 right-0 opacity-10">
            <Plane size={260} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <Sparkles size={22} />

                <span className="font-semibold">
                  AI Powered Travel Planner
                </span>

              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">

                Ready for your
                <br />
                next adventure?

              </h1>

              <p className="text-blue-100 mt-4 max-w-xl">

                Upload your booking, let AI build your itinerary,
                and explore every destination effortlessly.

              </p>

            </div>

            <Link
              to="/upload"
              className="mt-8 lg:mt-0 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transition flex items-center gap-3"
            >
              <Plus size={22} />
              Plan New Trip
            </Link>

          </div>

        </div>


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Plane className="text-indigo-600 mb-4" />

            <h2 className="text-3xl font-bold">
              {totalTrips}
            </h2>

            <p className="text-gray-500">
              Trips Planned
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Globe className="text-green-600 mb-4" />

            <h2 className="text-3xl font-bold">
              {countries.length}
            </h2>

            <p className="text-gray-500">
              Countries
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Clock3 className="text-orange-500 mb-4" />

            <h2 className="text-3xl font-bold">
              {upcomingTrips}
            </h2>

            <p className="text-gray-500">
              Upcoming Trips
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Calendar className="text-pink-600 mb-4" />

            <h2 className="text-3xl font-bold">
              {totalTravelDays}
            </h2>

            <p className="text-gray-500">
              Travel Days
            </p>

          </div>

        </div>


        {upcomingTrip && (
          <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm mb-10">

            {/* Decorative background */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-50 rounded-full" />
            <div className="absolute -right-8 bottom-0 w-40 h-40 bg-blue-50 rounded-full" />

            <div className="relative z-10 p-8">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">

                <div>

                  <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-2">
                    <Sparkles size={17} />
                    YOUR NEXT ADVENTURE
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900">
                    {upcomingTrip.destination}
                  </h2>

                  <div className="flex items-center gap-2 text-slate-500 mt-2">
                    <Calendar size={17} />

                    <span>
                      {new Date(
                        upcomingTrip.startDate
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}

                      {" – "}

                      {new Date(
                        upcomingTrip.endDate
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                </div>

                <Link
                  to={`/itinerary/${upcomingTrip._id}`}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  View Itinerary
                  <ArrowRight size={18} />
                </Link>

              </div>


              {/* Countdown */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-5 text-white mb-7">

                <div className="flex items-center gap-3">

                  <div className="p-3 bg-white/15 rounded-xl">
                    <Plane size={22} />
                  </div>

                  <div>

                    <p className="text-indigo-100 text-sm">
                      {daysUntilTrip === 0
                        ? "Your trip starts"
                        : "Your trip begins in"}
                    </p>

                    <p className="text-2xl font-bold">
                      {daysUntilTrip === 0
                        ? "Today ✈️"
                        : `${daysUntilTrip} ${daysUntilTrip === 1 ? "day" : "days"
                        }`}
                    </p>

                  </div>

                </div>

              </div>


              {/* Trip statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-slate-50 rounded-2xl p-5">

                  <Calendar
                    size={21}
                    className="text-indigo-600 mb-3"
                  />

                  <p className="text-2xl font-bold text-slate-900">
                    {upcomingTripDays}
                  </p>

                  <p className="text-sm text-slate-500">
                    Travel Days
                  </p>

                </div>


                <div className="bg-slate-50 rounded-2xl p-5">

                  <MapPin
                    size={21}
                    className="text-green-600 mb-3"
                  />

                  <p className="text-2xl font-bold text-slate-900">
                    {upcomingPlaces}
                  </p>

                  <p className="text-sm text-slate-500">
                    Places
                  </p>

                </div>


                <div className="bg-slate-50 rounded-2xl p-5">

                  <Plane
                    size={21}
                    className="text-orange-500 mb-3"
                  />

                  <p className="text-2xl font-bold text-slate-900">
                    {upcomingFlights}
                  </p>

                  <p className="text-sm text-slate-500">
                    Flights
                  </p>

                </div>


                <div className="bg-slate-50 rounded-2xl p-5">

                  <Hotel
                    size={21}
                    className="text-pink-500 mb-3"
                  />

                  <p className="text-2xl font-bold text-slate-900">
                    {upcomingHotels}
                  </p>

                  <p className="text-sm text-slate-500">
                    Hotels
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}


        <div className="grid lg:grid-cols-3 gap-6 mb-10">

          {/* Checklist */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-start justify-between mb-6">

              <div className="flex items-center gap-4">

                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <ClipboardCheck size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Before You Go
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Complete your essential travel preparations
                  </p>
                </div>

              </div>

              {completedCount > 0 && (
                <button
                  onClick={() => setCompletedItems([])}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>
              )}

            </div>


            {/* Progress */}

            <div className="mb-6">

              <div className="flex justify-between items-center mb-2">

                <span className="text-sm font-medium text-slate-600">
                  {completedCount} of {checklistItems.length} completed
                </span>

                <span className="text-sm font-bold text-indigo-600">
                  {checklistProgress}%
                </span>

              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${checklistProgress}%`,
                  }}
                />

              </div>

            </div>


            {/* Checklist */}

            <div className="grid sm:grid-cols-2 gap-3">

              {checklistItems.map((item) => {

                const completed = completedItems.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`
              flex items-center gap-3
              text-left
              p-4
              rounded-2xl
              border
              transition-all
              duration-200
              ${completed
                        ? "bg-green-50 border-green-200"
                        : "bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40"
                      }
            `}
                  >

                    <div
                      className={`
                w-6 h-6
                rounded-full
                flex items-center justify-center
                flex-shrink-0
                border-2
                transition
                ${completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-slate-300 bg-white"
                        }
              `}
                    >

                      {completed && <Check size={15} />}

                    </div>

                    <span
                      className={`
                text-sm font-medium
                ${completed
                          ? "text-green-700 line-through"
                          : "text-slate-700"
                        }
              `}
                    >
                      {item.label}
                    </span>

                  </button>
                );

              })}

            </div>

          </div>


          {/* Checklist Summary */}

          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-3xl p-7 flex flex-col justify-between">

            <div>

              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                <Plane size={24} />
              </div>

              <h2 className="text-2xl font-bold">
                Almost ready!
              </h2>

              <p className="text-indigo-100 mt-2 leading-relaxed">
                Complete your checklist before your journey
                so you can travel without last-minute stress.
              </p>

            </div>

            <div className="mt-8">

              <div className="text-5xl font-bold">
                {checklistProgress}%
              </div>

              <p className="text-indigo-100 mt-1">
                Travel preparation complete
              </p>

            </div>

          </div>

        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips?.map((trip) => (
              <Link key={trip._id} to={`/itinerary/${trip._id}`} className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <ArrowRight size={20} className="text-gray-300 group-hover:text-indigo-600 transition" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{trip.destination}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>
              </Link>
            ))}
            {trips?.length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                <p className="text-gray-500">No trips found. Upload a booking document to get started!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}