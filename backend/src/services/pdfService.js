const PDFDocument = require('pdfkit');

exports.generateTripPDF = (trip, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Header
  doc.fillColor('#4f46e5').fontSize(28).text('TravelAI Itinerary', { align: 'right' });
  doc.moveDown();
  
  // Trip Info
  doc.fillColor('#111827').fontSize(24).text(trip.destination);
  doc.fontSize(12).fillColor('#6b7280').text(`${trip.startDate} to ${trip.endDate}`);
  doc.moveDown();

  // Summary
  doc.fillColor('#111827').fontSize(16).text('Trip Summary', { underline: true });
  doc.fontSize(11).text(trip.itinerary.tripSummary);
  doc.moveDown();

  // Daily Schedule
  trip.itinerary.days.forEach(day => {
    doc.addPage();
    doc.fillColor('#4f46e5').fontSize(18).text(`Day ${day.day}: ${day.title}`);
    doc.moveDown(0.5);
    
    day.activities.forEach(act => {
      doc.fillColor('#111827').fontSize(10).text(`${act.time}`, { continued: true, bold: true });
      doc.fillColor('#374151').fontSize(10).text(` - ${act.activity}`);
      doc.moveDown(0.5);
    });
    doc.moveDown();
  });

  // Tips
  doc.addPage();
  doc.fillColor('#111827').fontSize(16).text('Travel Tips', { underline: true });
  trip.itinerary.travelTips.forEach(tip => {
    doc.fontSize(10).text(`• ${tip}`);
    doc.moveDown(0.3);
  });

  doc.end();
};