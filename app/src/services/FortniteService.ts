import axios from "axios"
import * as cheerio from "cheerio"
import { Mission } from "../entities/Mission"

export class FortniteService {
  static async getAlerts() {
    try {
      const url = "https://stw-planner.com/mission-alerts"
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      const missionList: Mission[] = []
  
      const specialMissionElement = $(".special-reward-entry .mission-entry")
  
      if (specialMissionElement.length === 0) {
        throw new Error("Não há alertas hoje!")
      }
  
      specialMissionElement.each((index, element) => {
        const details = $(element).find(".mission-entry .mission-details").text();
        const level = $(element).find(".mission-entry .special-overview").text();
        const zone = details.split(" - ")[1];
        const vbuckReward = $(element).find(".mission-rewards .mission-reward-name > .mission-reward-name").text();
  
        const mission = new Mission(details, level, zone, vbuckReward)
        missionList.push(mission)
      })
  
      return missionList
    } catch (err) {
      throw new Error(`Erro ao obter missões: ${err.message}`)
    }
  }
}