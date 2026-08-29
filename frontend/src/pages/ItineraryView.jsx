import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Download, Share2, MapPin, Calendar } from 'lucide-react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import jsPDF from "jspdf";
import WeatherCard from "../components/WeatherCard";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ItineraryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: trip, isLoading } = useQuery({
    queryKey: ['trip', id],
    queryFn: async () => {
      const { data } = await api.get(`/trips/${id}`);
      return data;
    }
  });

  const { data: weather } = useQuery({
    queryKey: ["weather", trip?.destination],
    enabled:
      !!trip?.itinerary?.days?.length &&
      !!trip?.itinerary?.days[0]?.activities?.length &&
      !!trip?.itinerary?.days[0]?.activities[0]?.coordinates,
    queryFn: async () => {
      const { data } = await api.get("/weather", {
        params: {
          lat: trip.itinerary.days[0].activities[0].coordinates.lat,
          lng: trip.itinerary.days[0].activities[0].coordinates.lng,
        },
      });

      return data;
    },
  });

  const locations =
    trip?.itinerary?.days?.flatMap(day => day.activities)
      ?.filter(act => act.coordinates?.lat && act.coordinates?.lng) || [];

  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_API_URL}/trips/${id}/pdf`, '_blank');
  };

  const handleShare = () => {
    const url = `${window.location.origin}/share/${trip.shareToken}`;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied!');
  };

  if (isLoading) return <div className="p-10 text-center">Loading Itinerary...</div>;


  const handleDownloadPDF = () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 18;
      const contentWidth = pageWidth - margin * 2;

      let y = 20;

      const addPageIfNeeded = (height = 10) => {
        if (y + height > pageHeight - 18) {
          pdf.addPage();
          y = 20;
        }
      };

      const addText = (
        text,
        x,
        fontSize = 11,
        options = {}
      ) => {
        const {
          maxWidth = contentWidth,
          lineHeight = 6,
          bold = false,
        } = options;

        pdf.setFont(
          "helvetica",
          bold ? "bold" : "normal"
        );

        pdf.setFontSize(fontSize);

        const lines = pdf.splitTextToSize(
          String(text || ""),
          maxWidth
        );

        addPageIfNeeded(lines.length * lineHeight);

        pdf.text(lines, x, y);

        y += lines.length * lineHeight;

        return lines.length * lineHeight;
      };

      /* =========================
         HEADER
      ========================= */

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);

      pdf.text("TRAVELAI", margin, y);

      y += 10;

      pdf.setFontSize(20);
      pdf.text(
        trip.destination || "Travel Itinerary",
        margin,
        y
      );

      y += 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);

      pdf.text(
        `${trip.startDate} - ${trip.endDate}`,
        margin,
        y
      );

      y += 12;

      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      y += 10;

      /* =========================
         TRIP SUMMARY
      ========================= */

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(15);

      addPageIfNeeded(10);

      pdf.text("Trip Overview", margin, y);

      y += 8;

      addText(
        trip.itinerary?.tripSummary ||
        "Your personalized travel itinerary.",
        margin,
        11,
        {
          maxWidth: contentWidth,
          lineHeight: 6,
        }
      );

      y += 6;

      /* =========================
         DAY-BY-DAY ITINERARY
      ========================= */

      trip.itinerary?.days?.forEach((day) => {
        addPageIfNeeded(25);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(17);

        pdf.text(
          `Day ${day.day}`,
          margin,
          y
        );

        y += 7;

        if (day.title) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(11);

          pdf.text(
            day.title,
            margin,
            y
          );

          y += 8;
        }

        day.activities?.forEach((activity) => {
          addPageIfNeeded(35);

          /* Activity heading */

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(13);

          pdf.text(
            activity.placeName ||
            "Activity",
            margin,
            y
          );

          y += 6;

          /* Location */

          if (
            activity.city ||
            activity.country
          ) {
            pdf.setFont(
              "helvetica",
              "normal"
            );

            pdf.setFontSize(9);

            const location = [
              activity.city,
              activity.country,
            ]
              .filter(Boolean)
              .join(", ");

            pdf.text(
              location,
              margin,
              y
            );

            y += 5;
          }

          /* Time */

          if (activity.time) {
            pdf.setFont(
              "helvetica",
              "bold"
            );

            pdf.setFontSize(10);

            pdf.text(
              `Time: ${activity.time}`,
              margin,
              y
            );

            y += 5;
          }

          /* Activity description */

          if (activity.activity) {
            addText(
              activity.activity,
              margin,
              10,
              {
                maxWidth: contentWidth,
                lineHeight: 5,
              }
            );
          }

          /* Cost */

          if (activity.estimatedCost) {
            addText(
              `Estimated Cost: ${activity.estimatedCost}`,
              margin,
              9,
              {
                maxWidth: contentWidth,
                lineHeight: 5,
              }
            );
          }

          /* Best time */

          if (activity.bestTimeToVisit) {
            addText(
              `Best Time: ${activity.bestTimeToVisit}`,
              margin,
              9,
              {
                maxWidth: contentWidth,
                lineHeight: 5,
              }
            );
          }

          y += 5;

          pdf.setDrawColor(210, 210, 210);

          pdf.line(
            margin,
            y,
            pageWidth - margin,
            y
          );

          y += 8;
        });

        y += 4;
      });

      /* =========================
         TRAVEL TIPS
      ========================= */

      const travelTips =
        trip.itinerary?.travelTips || [];

      if (travelTips.length > 0) {
        addPageIfNeeded(20);

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(17);

        pdf.text(
          "Travel Tips",
          margin,
          y
        );

        y += 9;

        travelTips.forEach((tip) => {
          addPageIfNeeded(12);

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(10);

          const lines =
            pdf.splitTextToSize(
              `• ${tip}`,
              contentWidth
            );

          pdf.text(
            lines,
            margin,
            y
          );

          y +=
            lines.length * 5 +
            3;
        });
      }

      /* =========================
         FOOTER
      ========================= */

      const totalPages =
        pdf.internal.getNumberOfPages();

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        pdf.setPage(page);

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(8);

        pdf.text(
          "Generated by TravelAI",
          margin,
          pageHeight - 10
        );

        pdf.text(
          `Page ${page} of ${totalPages}`,
          pageWidth - margin,
          pageHeight - 10,
          {
            align: "right",
          }
        );
      }

      const safeDestination =
        (trip.destination ||
          "TravelAI")
          .replace(
            /[^a-z0-9]/gi,
            "-"
          );

      pdf.save(
        `${safeDestination}-Itinerary.pdf`
      );

      toast.success(
        "Itinerary downloaded successfully!"
      );

    } catch (error) {
      console.error(
        "PDF generation failed:",
        error
      );

      toast.error(
        "Failed to generate PDF"
      );
    }
  };




  return (

    <div  className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">


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
                onClick={handleDownloadPDF}
                className="bg-white text-indigo-900 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <WeatherCard
          weather={weather}
          title={`Current Weather in ${trip.destination}`}
        />
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

        {/* Map Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-12 border border-gray-100">

          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                🗺️ Trip Map
              </h2>
              <p className="text-gray-500">
                Explore all attractions on an interactive map
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {locations.slice(0, 10).map((place, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                📍 {place.placeName}
              </span>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200">

            {locations.length > 0 ? (
              <MapContainer
                center={[
                  Number(locations[0].coordinates.lat),
                  Number(locations[0].coordinates.lng)
                ]}
                zoom={12}
                style={{
                  height: "500px",
                  width: "100%"
                }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((place, index) => (
                  <Marker
                    key={index}
                    position={[
                      Number(place.coordinates.lat),
                      Number(place.coordinates.lng)
                    ]}
                  >
                    <Popup>
                      <div className="min-w-[200px]">

                        {place.imageUrl && (
                          <img
                            src={place.imageUrl}
                            alt={place.placeName}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                        )}

                        <h3 className="font-bold">
                          {place.placeName}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                          {place.activity}
                        </p>

                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="h-[500px] flex items-center justify-center text-gray-500">
                No map locations available
              </div>
            )}

          </div>
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
                    onClick={() =>
                      navigate(
                        `/place/${trip._id}/${day.day}/${idx}`,
                        {
                          state: {
                            place: act,
                            destination: trip.destination
                          }
                        }
                      )
                    }
                    className="cursor-pointer relative bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition duration-300"
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