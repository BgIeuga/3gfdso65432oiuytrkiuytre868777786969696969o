import fetch from "node-fetch";

export async function handler() {
  try {
    const response = await fetch("https://api.mcsrvstat.us/2/Mineblood_smp.aternos.me:49205");
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        online: data.online,
        players: data.players ? data.players.online : 0,
        maxPlayers: data.players ? data.players.max : 0,
        version: data.version || "Unknown",
        motd: data.motd ? data.motd.clean.join(" ") : "No MOTD"
      })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Unable to fetch server status" }) };
  }
}
