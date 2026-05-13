require('dotenv').config({ path: '.env.local' });

async function test() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;
  console.log("Using API Key:", apiKey.substring(0, 10));

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/Appointments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: "Test",
          Notes: "Test",
          Status: "Pending",
          CreatedAt: new Date().toISOString(),
        },
      }),
    }
  );

  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}

test();
