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
import voidBattleSchedule from '../assets/json/VoidBattleSchedule.json';
import voidBattleScheduleForEvent from '../assets/json/VoidBattleSchedule.event.json';

export default {
    data () {
        const date = new Date();
        date.setHours(date.getHours() - 15);
        const day = date.getDay();
        const dayStrings = {
            0: 'Sun',
            1: 'Mon',
            2: 'Tue',
            3: 'Wed',
            4: 'Thu',
            5: 'Fri',
            6: 'Sat'
        };

        const eventEndDate = new Date(2019, 4 - 1, 26, 15);
        return {
            voidEnemies: (date < eventEndDate ? voidBattleScheduleForEvent : voidBattleSchedule)
                .filter(battle => battle[dayStrings[day]])
                .map(battle => {
                    return require('@/assets/img/enemy/' + battle.Boss.replace(' ', '_') + '_Enemy_Icon.png');
                })
        }
    }
}
</script>
