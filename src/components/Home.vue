<template>
    <article>
        <DragonGifts />
        <VoidBattles />
        
        <nav class="menu">
            <ul>
                <li>
                    <router-link to="/status-simulator">ステータスシミュ</router-link>
                </li>
                <li>
                    <router-link to="/adventurer-matrix">キャラクター表</router-link>
                </li>
                <li>
                    <router-link to="/adventurer-list">キャラ一覧</router-link>
                </li>
                <li>
                    <router-link to="/wyrmprint-list">護符一覧</router-link>
                </li>
            </ul>
        </nav>
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

<style>
nav.menu ul {
    list-style: none;
}
</style>
