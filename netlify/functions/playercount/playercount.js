import { status } from 'minecraft-server-util';

export async function handler() {
  try {
    const res = await status('Mineblood_smp.aternos.me', 49205, { timeout: 5000 });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        onlinePlayers: res.players.online
      })
    };
  } catch (err) {
    return {
      statusCode: 200, // still return 200 so frontend doesn’t break
      body: JSON.stringify({ onlinePlayers: 0 })
    };
  }
}
