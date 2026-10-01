import { getAccessToken } from './firebaseAuth';
import { StudentOrder } from '../types';

export interface SheetEntry {
  date: string;
  orderId: string;
  studentName: string;
  whatsapp: string;
  itemTitle: string;
  classLevel: string;
  amount: number;
  paymentMethod: string;
  trxId: string;
  status: string;
}

const SPREADSHEET_ID_STORAGE_KEY = 'aw_assignment_spreadsheet_id';

/**
 * Get or create the user's order tracker spreadsheet in Google Drive/Sheets
 */
export const getOrCreateOrderSpreadsheet = async (): Promise<string> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not signed in to Google');

  const existingId = localStorage.getItem(SPREADSHEET_ID_STORAGE_KEY);
  if (existingId) {
    // Verify it still exists and is accessible
    try {
      const checkRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${existingId}?fields=spreadsheetId`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (checkRes.ok) {
        return existingId;
      }
    } catch {
      // Continue to create a new one
    }
  }

  // Create new spreadsheet
  const newSheetRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'AW Assignment Work - Student Orders & Solved Notes Log',
      },
      sheets: [
        {
          properties: {
            title: 'Orders',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!newSheetRes.ok) {
    throw new Error('Failed to create Google Sheet for tracking orders');
  }

  const sheetData = await newSheetRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  localStorage.setItem(SPREADSHEET_ID_STORAGE_KEY, spreadsheetId);

  // Add header row
  const headerValues = [
    [
      'Order Date',
      'Order ID',
      'Student Name',
      'WhatsApp Number',
      'Assignment / Item Title',
      'Class / Level',
      'Price (PKR)',
      'Payment Method',
      'Trx ID / Notes',
      'Status',
    ],
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Orders!A1:J1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: headerValues,
      }),
    }
  );

  return spreadsheetId;
};

/**
 * Append an order row to Google Sheets
 */
export const appendOrderToSheet = async (order: StudentOrder): Promise<boolean> => {
  const token = await getAccessToken();
  if (!token) return false;

  try {
    const spreadsheetId = await getOrCreateOrderSpreadsheet();
    const row = [
      order.createdAt,
      order.id,
      order.studentName,
      order.whatsappNumber,
      order.itemTitle,
      order.classLevel,
      order.price,
      order.paymentMethod,
      order.trxId || 'Pending Verification',
      order.status,
    ];

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Orders!A:J:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [row],
        }),
      }
    );

    return res.ok;
  } catch (err) {
    console.warn('Could not sync to Google Sheets:', err);
    return false;
  }
};

/**
 * Fetch orders stored in the student's Google Sheet
 */
export const fetchOrdersFromSheet = async (): Promise<SheetEntry[]> => {
  const token = await getAccessToken();
  if (!token) return [];

  const spreadsheetId = localStorage.getItem(SPREADSHEET_ID_STORAGE_KEY);
  if (!spreadsheetId) return [];

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Orders!A2:J50`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    const rows = data.values || [];

    return rows.map((r: any) => ({
      date: r[0] || '',
      orderId: r[1] || '',
      studentName: r[2] || '',
      whatsapp: r[3] || '',
      itemTitle: r[4] || '',
      classLevel: r[5] || '',
      amount: Number(r[6]) || 0,
      paymentMethod: r[7] || '',
      trxId: r[8] || '',
      status: r[9] || 'Completed',
    }));
  } catch (err) {
    console.error('Failed to read Google Sheet:', err);
    return [];
  }
};
