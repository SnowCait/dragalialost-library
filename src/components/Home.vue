<template>
    <article>
        <DragonGifts />
        <VoidBattles />
        <router-link to="/status-simulator">ステータスシミュ</router-link>
    </article>
</template>

<script>
import DragonGifts from './DragonGifts.vue'
import VoidBattles from './VoidBattles.vue'

export default {
    components: {
        DragonGifts,
        VoidBattles
    }
}
</script>
