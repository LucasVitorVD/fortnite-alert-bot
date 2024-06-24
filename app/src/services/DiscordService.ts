import { Client, GatewayIntentBits } from "discord.js";
import { FortniteService } from "./FortniteService";
import { config } from "dotenv";

export class DiscordService {
  static async startBot() {
    try {
      config()

      const discordClient = new Client({
        intents: [
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.Guilds
        ]
      })

      discordClient.on('ready', async () => {
        console.log("Bot online")

        const channel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID as string ?? "")

        if (channel && channel.isTextBased()) {
          const message = await FortniteService.getAlerts()

          await channel.send(`${message}`)
        } else {
          console.error("O canal informado não é do tipo text channel")
        }
      })

      await discordClient.login(process.env.DISCORD_TOKEN)
    } catch (err) {
      throw new Error(err)
    }
  }
}