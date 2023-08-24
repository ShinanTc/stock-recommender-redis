export default async function handler(request, response) {
  try {
    // Your cron job logic goes here
    // This block will run according to the schedule specified in vercel.json
    // Replace this comment with your cron job code
    console.log("Cron job successfull (FROM HANDLER");

    // Respond with a success message
    response.status(200).send("Cron job executed successfully.");
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send("Internal Server Error");
  }
}
