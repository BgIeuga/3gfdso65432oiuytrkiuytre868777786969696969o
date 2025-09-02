const fetch = require("node-fetch");

exports.handler = async function () {
  const ip = "Mineblood_smp.aternos.me:49205";

  try {
    // Primary API
    let res = await fetch("https://api.mcsrvstat.us/2/" + ip);
    let data = await res.json();

    // Fallback API if offline
    if (!data.online) {
      let [host, port] = ip.split(":");
      let fallback = await fetch(`https://mcapi.us/server/status?ip=${host}&port=${port}`);
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
      body: JSON.stringify({ online: false, error: err.message }),
      headers: { "Content-Type": "application/json" }
    };
  }
};
