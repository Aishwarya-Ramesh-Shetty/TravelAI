import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Download, Share2, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ItineraryView() {
  const { id } = useParams();
  const { data: trip, isLoading } = useQuery({
    queryKey: ['trip', id],
    queryFn: async () => {
      const { data } = await api.get(`/trips/${id}`);
      return data;
    }
  });

  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_API_URL}/trips/${id}/pdf`, '_blank');
  };

  const handleShare = () => {
    const url = `${window.location.origin}/share/${trip.shareToken}`;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied!');
  };

  if (isLoading) return <div className="p-10 text-center">Loading Itinerary...</div>;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 text-white">
          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                <MapPin size={16} />
                <span>Dream Destination</span>
              </div>

              <h1 className="text-5xl font-extrabold mb-4">
                {trip.destination}
              </h1>

              <div className="flex items-center gap-2 text-indigo-100">
                <Calendar size={18} />
                <span>
                  {trip.startDate} - {trip.endDate}
                </span>
              </div>
            </div>

            <div className="flex gap-3 self-start">
              <button
                onClick={handleShare}
                className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl hover:bg-white/20 transition flex items-center gap-2"
              >
                <Share2 size={18} />
                Share
              </button>

              <button
                onClick={handleDownload}
                className="bg-white text-indigo-900 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
              ✨
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Trip Overview
              </h2>
              <p className="text-gray-500">
                AI-generated travel summary
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg">
            {trip.itinerary.tripSummary}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">

          {trip.itinerary.days.map((day) => (
            <div
              key={day.day}
              className="relative"
            >

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {day.day}
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Day {day.day}
                  </h3>

                  <p className="text-gray-500">
                    {day.title}
                  </p>
                </div>

              </div>

              <div className="ml-7 border-l-2 border-indigo-200 pl-10 space-y-5">

                {day.activities.map((act, idx) => (

                  <div
                    key={idx}
                    className="relative bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl transition duration-300"
                  >

                    
                    <div className="absolute -left-[50px] top-6 w-4 h-4 rounded-full bg-indigo-600"></div>

                    <img
                      src={
                        act.imageUrl ||
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
                      }
                      alt={act.placeName || "Travel Destination"}
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-6">

                      <div className="flex flex-wrap gap-3 items-center mb-4">

                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                          🕒 {act.time}
                        </span>

                        {act.bestTimeToVisit && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Best Time: {act.bestTimeToVisit}
                          </span>
                        )}

                      </div>

                      {act.placeName && (
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">
                          📍 {act.placeName}
                        </h4>
                      )}

                      <p className="text-gray-600 leading-relaxed text-lg">
                        {act.activity}
                      </p>

                      {act.estimatedCost && (
                        <div className="mt-4 inline-flex items-center bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium">
                          💰 Estimated Cost: {act.estimatedCost}
                        </div>
                      )}

                    </div>

                  </div>
                ))}


              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );

}