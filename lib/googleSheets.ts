import { JWT } from "google-auth-library";

const SPREADSHEET_ID = "1nlEZmswrdUOn97ggMu48_cvtqiC53COsDwfUlCNRGTo";

const SHEETS_API_BASE = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;

const HEADER_ROWS = 1;
const SUBSCRIBED_VALUE = 1;
const UNSUBSCRIBED_VALUE = 0;

let cachedAuthClient: JWT | null = null;
let cachedSheetTitle: string | null = null;

function getAuthClient(): JWT {
  if (cachedAuthClient) return cachedAuthClient;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set",
    );
  }

  cachedAuthClient = new JWT({
    email,
    key: rawKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return cachedAuthClient;
}

async function getSheetTitle(auth: JWT): Promise<string> {
  if (cachedSheetTitle) return cachedSheetTitle;

  const res = await auth.request<{
    sheets: Array<{ properties: { title: string } }>;
  }>({
    url: `${SHEETS_API_BASE}?fields=sheets.properties.title`,
  });

  const title = res.data.sheets[0]?.properties.title;
  if (!title) {
    throw new Error("Mailing list spreadsheet has no sheets");
  }

  cachedSheetTitle = title;
  return title;
}

interface RowLookup {
  sheetTitle: string;
  emails: string[];
  statuses: string[];
}

async function getRows(auth: JWT): Promise<RowLookup> {
  const sheetTitle = await getSheetTitle(auth);

  const res = await auth.request<{ values?: string[][] }>({
    url: `${SHEETS_API_BASE}/values/${encodeURIComponent(`${sheetTitle}!A${HEADER_ROWS + 1}:B`)}`,
  });

  const values = res.data.values ?? [];
  return {
    sheetTitle,
    emails: values.map((row) => (row[0] ?? "").trim().toLowerCase()),
    statuses: values.map((row) => row[1] ?? ""),
  };
}

// a blank status means the row predates this column and is treated as subscribed
function isUnsubscribed(status: string): boolean {
  return status === String(UNSUBSCRIBED_VALUE);
}

export type SubscribeResult = "added" | "resubscribed" | "already_subscribed";

export async function subscribeEmail(
  rawEmail: string,
): Promise<SubscribeResult> {
  const email = rawEmail.trim();
  const auth = getAuthClient();
  const { sheetTitle, emails, statuses } = await getRows(auth);

  const rowIndex = emails.indexOf(email.toLowerCase());

  if (rowIndex === -1) {
    await auth.request({
      url: `${SHEETS_API_BASE}/values/${encodeURIComponent(`${sheetTitle}!A${HEADER_ROWS + 1}:B`)}:append?valueInputOption=RAW`,
      method: "POST",
      data: { values: [[email, SUBSCRIBED_VALUE]] },
    });
    return "added";
  }

  if (isUnsubscribed(statuses[rowIndex])) {
    const sheetRow = rowIndex + HEADER_ROWS + 1;
    await auth.request({
      url: `${SHEETS_API_BASE}/values/${encodeURIComponent(`${sheetTitle}!B${sheetRow}`)}?valueInputOption=RAW`,
      method: "PUT",
      data: { values: [[SUBSCRIBED_VALUE]] },
    });
    return "resubscribed";
  }

  return "already_subscribed";
}

export type UnsubscribeResult =
  "flagged" | "not_found" | "already_unsubscribed";

export async function unsubscribeEmail(
  rawEmail: string,
): Promise<UnsubscribeResult> {
  const email = rawEmail.trim().toLowerCase();
  const auth = getAuthClient();
  const { sheetTitle, emails, statuses } = await getRows(auth);

  const rowIndex = emails.indexOf(email);
  if (rowIndex === -1) return "not_found";
  if (isUnsubscribed(statuses[rowIndex])) return "already_unsubscribed";

  const sheetRow = rowIndex + HEADER_ROWS + 1;
  await auth.request({
    url: `${SHEETS_API_BASE}/values/${encodeURIComponent(`${sheetTitle}!B${sheetRow}`)}?valueInputOption=RAW`,
    method: "PUT",
    data: { values: [[UNSUBSCRIBED_VALUE]] },
  });
  return "flagged";
}
