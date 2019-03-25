<template>
    <section>
        <h2>ヴォイド</h2>
        <ul class="thumbnails">
            <li v-for="enemy in voidEnemies" :key="enemy">
                <img :src="enemy">
            </li>
        </ul>
    </section>
</template>

<script>
import voidBattles from '../assets/json/VoidBattles.json';

export default {
    data () {
        const date = new Date();
        date.setHours(date.getHours() - 15);
        const day = date.getDay();
        return {
            voidEnemies: voidBattles
                .filter(battle => battle[day])
                .map(battle => {
                    return require('@/assets/img/enemy/' + battle.Boss.replace(' ', '_') + '_Enemy_Icon.png');
                })
        }
    }
}
</script>
