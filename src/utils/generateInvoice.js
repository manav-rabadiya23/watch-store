import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png";

function loadImageAsDataURL(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = src;
  });
}

export async function generateInvoice(order) {
  const doc = new jsPDF("p", "mm", "a4");

  const {
    orderId,
    date,
    customer,
    items,
    subtotal,
    shipping,
    gstAmount,
    total,
    paymentMethod,
  } = order;

  const pageWidth = doc.internal.pageSize.getWidth();

  const formatCurrency = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

  const safeText = (value) => (value ? String(value) : "-");

  let logoData = null;
  try {
    logoData = await loadImageAsDataURL(logo);
  } catch (error) {
    console.error("Logo load failed:", error);
  }

  // Background line
  doc.setDrawColor(220, 210, 196);
  doc.line(12, 12, 198, 12);

  // Logo
  if (logoData) {
    doc.addImage(logoData, "PNG", 14, 16, 26, 18);
  }

  // Store details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(30, 30, 30);
  doc.text("M.wat_ches", 44, 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text("Modern Watch Store", 44, 28);
  doc.text("Premium watches crafted for modern style and elegance", 44, 33);

  // Invoice title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text("TAX INVOICE", pageWidth - 14, 22, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  doc.text(`Invoice No: ${safeText(orderId)}`, pageWidth - 14, 29, {
    align: "right",
  });
  doc.text(`Date: ${safeText(date)}`, pageWidth - 14, 34, {
    align: "right",
  });

  // GST / business block
  doc.setDrawColor(215, 215, 215);
  doc.setFillColor(248, 245, 240);
  doc.roundedRect(14, 42, 85, 34, 2, 2, "FD");
  doc.roundedRect(111, 42, 85, 34, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(35, 35, 35);
  doc.text("Seller Details", 18, 49);
  doc.text("Bill To", 115, 49);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(80, 80, 80);

  doc.text("M.wat_ches", 18, 56);
  doc.text("GSTIN: 24ABCDE1234F1Z5", 18, 61);
  doc.text("State: Gujarat", 18, 66);
  doc.text("Email: mrwatches23@gmail.com", 18, 71);

  doc.text(`Name: ${safeText(customer?.name)}`, 115, 56);
  doc.text(`Email: ${safeText(customer?.email)}`, 115, 61);
  doc.text(`Phone: ${safeText(customer?.phone)}`, 115, 66);
  doc.text(
    `Address: ${safeText(customer?.address)}, ${safeText(customer?.city)} - ${safeText(customer?.pincode)}`,
    115,
    71,
    { maxWidth: 76 },
  );

  // Extra invoice meta
  doc.roundedRect(14, 82, 182, 16, 2, 2, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(`Payment Method: ${safeText(paymentMethod)}`, 18, 92);
  doc.text(`Place of Supply: Gujarat`, 105, 92);

  // Table data
  const bodyRows = (items || []).map((item, index) => {
    const qty = Number(item.quantity || 1);
    const price = Number(item.price || 0);
    const lineTotal = qty * price;
    const gstPercent = Number(item.gstPercent || 18);
    const taxableValue = lineTotal / (1 + gstPercent / 100);
    const gstValue = lineTotal - taxableValue;

    return [
      index + 1,
      item.name || item.title || "Watch",
      qty,
      formatCurrency(price),
      `${gstPercent}%`,
      formatCurrency(gstValue),
      formatCurrency(lineTotal),
    ];
  });

  autoTable(doc, {
    startY: 106,
    head: [
      ["Sr.", "Product", "Qty", "Unit Price", "GST %", "GST Amt", "Total"],
    ],
    body: bodyRows,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3.5,
      lineColor: [210, 210, 210],
      lineWidth: 0.3,
      textColor: [40, 40, 40],
      valign: "middle",
    },
    headStyles: {
      fillColor: [35, 35, 35],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [248, 246, 242],
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 12 },
      1: { cellWidth: 62 },
      2: { halign: "center", cellWidth: 16 },
      3: { halign: "right", cellWidth: 28 },
      4: { halign: "center", cellWidth: 18 },
      5: { halign: "right", cellWidth: 24 },
      6: { halign: "right", cellWidth: 28 },
    },
  });

  const finalY = doc.lastAutoTable.finalY + 8;

  const calculatedSubtotal = Number(subtotal || 0);
  const calculatedShipping = Number(shipping || 0);
  const calculatedGst = Number(gstAmount || 0);
  const calculatedTotal = Number(total || 0);

  // Summary box
  doc.setDrawColor(210, 210, 210);
  doc.setFillColor(250, 248, 244);
  doc.roundedRect(122, finalY, 74, 36, 2, 2, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);

  doc.text("Subtotal", 128, finalY + 8);
  doc.text(formatCurrency(calculatedSubtotal), 190, finalY + 8, {
    align: "right",
  });

  doc.text("Shipping", 128, finalY + 16);
  doc.text(formatCurrency(calculatedShipping), 190, finalY + 16, {
    align: "right",
  });

  doc.text("GST", 128, finalY + 24);
  doc.text(formatCurrency(calculatedGst), 190, finalY + 24, {
    align: "right",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Grand Total", 128, finalY + 33);
  doc.text(formatCurrency(calculatedTotal), 190, finalY + 33, {
    align: "right",
  });

  // Tax summary
  doc.roundedRect(14, finalY, 98, 36, 2, 2, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("GST Summary", 18, finalY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text("Tax Type: CGST + SGST", 18, finalY + 16);
  doc.text(
    `Total GST Amount: ${formatCurrency(calculatedGst)}`,
    18,
    finalY + 23,
  );
  doc.text(
    `Inclusive tax invoice generated for customer order.`,
    18,
    finalY + 30,
  );

  const footerY = finalY + 48;

  doc.setDrawColor(220, 210, 196);
  doc.line(14, footerY, 196, footerY);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for shopping with M.wat_ches.", 14, footerY + 8);
  doc.text(
    "This is a computer-generated invoice and does not require a signature.",
    14,
    footerY + 13,
  );

  doc.save(`invoice-${orderId}.pdf`);
}
