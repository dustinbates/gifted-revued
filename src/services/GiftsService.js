import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { giftsApi } from "./AxiosService.js"

class GiftsService{
    async getGifts(){
        const res = await giftsApi.get('gifts')
        AppState.gifts = res.data.map(g => new Gift(g))
        logger.log('getting gifts', AppState.gifts)

    }

    async openGift(giftId){
        const res = await giftsApi.put(`gifts/${giftId}`, {opened: true})
        const openedGift = new Gift(res.data)
        const index = AppState.gifts.findIndex(g => g.id == giftId)
        AppState.gifts.splice(index, 1, openedGift);
        }

    async sendGift(giftData){
        let newGift = new Gift(giftData)
        const res = await giftsApi.post('/gifts', newGift)
        logger.log('sending gift', res.data)
    }
}

export const giftsService = new GiftsService()