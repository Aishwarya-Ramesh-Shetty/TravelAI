import jsPDF from "jspdf";

export const generateItineraryPDF = (trip) => {
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

    // Header
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

    // Trip Overview
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

    // Days
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

        // Place
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);

        pdf.text(
          activity.placeName || "Activity",
          margin,
          y
        );

        y += 6;

        // Location
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

        // Time
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

        // Activity
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

        // Cost
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

        // Best time
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

    // Travel Tips
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

    // Footer
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
      (trip.destination || "TravelAI")
        .replace(/[^a-z0-9]/gi, "-");

    pdf.save(
      `${safeDestination}-Itinerary.pdf`
    );

    return true;

  } catch (error) {
    console.error(
      "PDF generation failed:",
      error
    );

    throw error;
  }
};