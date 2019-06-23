<template>
    <section>
        <h2>ドラゴンの好物</h2>
        <div v-if="todayGifts[0].FavoriteType != 99">
            <ul class="thumbnails">
                <li v-for="dragon in todayDragons" :key="dragon.Id">
                    <img :src="dragon.Image">
                </li>
            </ul>
        </div>
        <div v-else>
            <p>
                全てのドラゴン
            </p>
        </div>
    </section>
</template>

<script>
import gifts from '../assets/json/Gifts.min.json';
import dragons from '../assets/json/Dragons.min.json';

export default {
    data () {
        const date = new Date();
        date.setHours(date.getHours() - 15);
        const day = date.getDay();
        const favoriteType = (day == 0 || day == 6) ? 99 : day;
        dragons.sort((x, y) => {
                if (x.Rarity == y.Rarity) {
                    return 0;
                } else if (x.Rarity > y.Rarity) {
                    return -1;
                } else {
                    return 1;
                }
            });
        return {
            todayGifts: gifts.filter(gift => gift.FavoriteType == favoriteType),
            favoriteType: favoriteType,
            todayDragons: dragons
                .filter(dragon => dragon.FavoriteType == favoriteType)
                .map(dragon => {
                    dragon.Image = require('@/assets/img/dragon/' + dragon.BaseId + '_01.png');
                    return dragon;
                })
        }
    }
}
</script>
