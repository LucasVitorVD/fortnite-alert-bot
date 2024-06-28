import axios from "axios"
import * as cheerio from "cheerio"
import { Mission } from "entities/Mission"
import { formatDate } from "utils/utils"

export class FortniteService {
  static async getAlerts() {
    try {
      const url = "https://stw-planner.com/mission-alerts"
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      const missionList: Mission[] = []
  
      const specialMissionElement = $(".special-reward-entry .mission-entry")
  
      if (specialMissionElement.length === 0) {
        console.warn("Não há alertas hoje!")

        return
      } else {
        console.warn("Tem alertas hoje!")

        specialMissionElement.each((_, element) => {
          const details = $(element).find(".mission-entry .mission-details").text().replace(/\n/g, '');
          const level = $(element).find(".mission-entry .special-overview").text().replace(/\n/g, '');
          const zone = details.split(" - ")[1];
          const vbuckReward = $(element).find(".mission-rewards .mission-reward-name > .mission-reward-name").text().replace(/\n/g, '');
    
          const mission = new Mission(details, level, zone, vbuckReward)
          missionList.push(mission)
        })

        return this.buildMessage(missionList)
      }
    } catch (err: any) {
      throw new Error(`Erro ao obter missões: ${err.message}`)
    }
  }

  private static buildMessage(missionList: Mission[]) {
    let message = `**Alertas do dia: ${formatDate(new Date())}\n\nTotal: ${missionList.length}**\n\n`;

    missionList.forEach((mission) => {
      message += `**Missão**: ${mission.getDetails()}\n`;
      message += `**Zona**: ${mission.getZone()}\n`;
      message += `**Level**: ${mission.getLevel()}\n`;
      message += `**V-bucks**: ${mission.getReward()}\n\n`;
    });

    return message
  }
}