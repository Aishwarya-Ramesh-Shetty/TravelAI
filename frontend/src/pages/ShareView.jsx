import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export default function ShareView() {
  const { token } = useParams();
  const { data: trip, isLoading, error } = useQuery({
    queryKey: ['share', token],
    queryFn: async () => {
      const { data } = await api.get(`/share/${token}`);
      return data;
    }
  });

  if (isLoading) return <div className="p-20 text-center">Loading Public Itinerary...</div>;
  if (error) return <div className="p-20 text-center">Itinerary not found or link expired.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold uppercase">Shared Itinerary</span>
          <h1 className="text-4xl font-bold mt-4">{trip.destination}</h1>
      </div>
      {/* Reuse the display logic from ItineraryView.jsx */}
      <div className="space-y-8">
        {trip.itinerary.days.map(day => (
          <div key={day.day} className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold border-b pb-2 mb-4">Day {day.day}: {day.title}</h3>
            {day.activities.map((a, i) => (
              <div key={i} className="flex gap-4 mb-3">
                <span className="font-bold text-indigo-600 min-w-[60px]">{a.time}</span>
                <p className="text-gray-700">{a.activity}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}