<template>
    <div class="card h-100 text-start">
        <img @click="openGift(gift.id)" class="card-img-top giftImg" :src="gift.url ? gift.url : 'https://static.vecteezy.com/system/resources/previews/013/995/652/original/3d-christmas-gift-box-png.png'" alt="Title">
        <div class="card-body">
            <h4 class="card-title">{{ gift.tag }}</h4>
        </div>
    </div>
</template>


<script>
import { Gift } from '../models/Gift.js';
import { giftsService } from '../services/GiftsService.js';
import Pop from '../utils/Pop';


export default {
    props: {
        gift: { type: Gift }
    },
    setup(){
        return {
            async openGift(giftId){
                try {
                    await giftsService.openGift(giftId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        
    }
    }
}
</script>


<style lang="scss" scoped>

.giftImg{
    height: 20em;
    width: auto;
}

</style>