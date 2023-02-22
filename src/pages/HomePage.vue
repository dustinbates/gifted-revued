<template>
  <div class="container-fluid">
    <div class="row">
      <form @submit.prevent="sendGift()">
        <input v-model="editable.url" required type="text" name="url" placeholder="Gift url">
        <input v-model="editable.tag" required type="text" name="tag" placeholder="Gift tag">
        <button class="btn btn-success" type="submit">Send Gift</button>
      </form>
    </div>
    <div class="row">
      <div class="col-4 mb-3" v-for="giftFromTheVFor in gifts">
        <GiftCard :gift="giftFromTheVFor" />
      
      </div>
    </div>
  </div>
  
</template>

<script>
import Pop from '../utils/Pop.js';
import { giftsService } from '../services/GiftsService.js'
import { logger } from '../utils/Logger.js';
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import GiftCard from './GiftCard.vue';


export default {
    setup() {
        const editable = ref({})
        async function getGifts() {
            try {
                await giftsService.getGifts();
            }
            catch (error) {
                Pop.error(error);
                logger.error(error);
            }
        }
        onMounted(() => {
            logger.log("Hello from the home page");
            getGifts();
        });

        return {
            editable,
            gifts: computed(() => AppState.gifts),
            async sendGift() {
              try {
                let giftData = editable.value
                await giftsService.sendGift(giftData)
                editable.value = {}
              } catch (error) {
                Pop.error(error)
                logger.log(error)
              }
            }
        };
    },
    components: { GiftCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
