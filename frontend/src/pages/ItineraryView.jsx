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
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{trip.destination}</h1>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1"><Calendar size={18}/> {trip.startDate} - {trip.endDate}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"><Share2 size={18}/> Share</button>
          <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><Download size={18}/> PDF</button>
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-bold mb-2">Trip Summary</h2>
        <p className="text-indigo-900 leading-relaxed">{trip.itinerary.tripSummary}</p>
      </div>

      <div className="space-y-10">
        {trip.itinerary.days.map((day) => (
          <div key={day.day} className="relative pl-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{day.day}</div>
            <h3 className="text-2xl font-bold mb-4">Day {day.day}: {day.title}</h3>
            <div className="grid gap-4">
              {day.activities.map((act, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border shadow-sm flex gap-4">
                  <span className="font-mono text-indigo-600 font-bold w-16">{act.time}</span>
                  <p className="text-gray-700">{act.activity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}