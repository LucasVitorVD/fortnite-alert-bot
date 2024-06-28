import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { FortniteService } from "./FortniteService";
import { config } from "dotenv";
import { schedule } from "node-cron";

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

        const channel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID as string ?? "") as TextChannel

        if (!channel || !channel.isTextBased()) {
          console.error("O canal informado não é do tipo text channel")
          return
        }

        schedule('03 21 * * *', async () => {
          const message = await FortniteService.getAlerts()

          message !== undefined && await channel.send(`${message}`)
        })
      })

      await discordClient.login(process.env.DISCORD_TOKEN)
    } catch (err: any) {
      throw new Error(err)
    }
  }
}