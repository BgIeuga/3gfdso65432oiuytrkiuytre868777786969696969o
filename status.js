const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const ip = "Mineblood_smp.aternos.me:49205";

  try {
    // Try mcsrvstat.us
    let res = await fetch("https://api.mcsrvstat.us/2/" + ip);
    let data = await res.json();

    // If offline, fallback to mcapi.us
    if (!data.online) {
      let fallback = await fetch("https://mcapi.us/server/status?ip=" + ip.split(":")[0] + "&port=" + ip.split(":")[1]);
      let fb = await fallback.json();
      if (fb.online) {
        data = {
          online: true,
          players: { online: fb.players.now, max: fb.players.max }
        };
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ online: false, error: "Unable to fetch" }),
      headers: { "Content-Type": "application/json" }
    };
  }
};
