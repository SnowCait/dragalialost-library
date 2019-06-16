<template>
    <main>
        <h1>ドラガリ 護符一覧</h1>
        <table>
            <thead>
                <tr>
                    <th>画像</th>
                    <th>名前</th>
                    <th :class="sortedClass('MaxHp')" v-on:click="sortBy('MaxHp')">HP</th>
                    <th :class="sortedClass('MaxAtk')" v-on:click="sortBy('MaxAtk')">攻撃力</th>
                    <th :class="sortedClass('Might')" v-on:click="sortBy('Might')">戦力</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="wyrmprint in sortedWyrmprints" :key="wyrmprint.BaseId">
                    <td>
                        <img :src="wyrmprint.Image01" />
                        <img :src="wyrmprint.Image02" />
                    </td>
                    <td>
                        {{wyrmprint.NameJP}}
                    </td>
                    <td>
                        {{wyrmprint.MaxHp}}
                    </td>
                    <td>
                        {{wyrmprint.MaxAtk}}
                    </td>
                    <td>
                        {{wyrmprint.Might}}
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import wyrmprints from '@/assets/json/Wyrmprints.min.json'
import abilities from '@/assets/json/Abilities.min.json'

wyrmprints.forEach(wyrmprint => {
    wyrmprint.Image01 = require('@/assets/img/wyrmprint/' + wyrmprint.BaseId + '_01.png');
    wyrmprint.Image02 = require('@/assets/img/wyrmprint/' + wyrmprint.BaseId + '_02.png');

    let might = wyrmprint.MaxHp + wyrmprint.MaxAtk;
    if (wyrmprint.Abilities13 > 0) {
        const ability1 = abilities.filter(ability => {
            return ability.Id == wyrmprint.Abilities13;
        })[0];
        might += ability1 != null ? ability1.PartyPowerWeight : 0;
    }
    if (wyrmprint.Abilities23 > 0) {
        const ability2 = abilities.filter(ability => {
            return ability.Id == wyrmprint.Abilities23;
        })[0];
        might += ability2 != null ? ability2.PartyPowerWeight : 0;
    }
    if (wyrmprint.Abilities33 > 0) {
        const ability3 = abilities.filter(ability => {
            return ability.Id == wyrmprint.Abilities33;
        })[0];
        might += ability3 != null ? ability3.PartyPowerWeight : 0;
    }
    wyrmprint.Might = might;
});
export default {
    data () {
        return {
            wyrmprints,
            sort: {
                key: 'Might',
                isAsc: false,
            },
        }
    },
    computed: {
        sortedWyrmprints () {
            const wyrmprints = this.wyrmprints.slice();
            wyrmprints.sort((a, b) => {
                const aValue = a[this.sort.key];
                const bValue = b[this.sort.key];
                return (aValue === bValue ? 0 : aValue > bValue ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
            });
            return wyrmprints;
        }
    },
    methods: {
        sortedClass (key) {
            return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : 'sorted';
        },
        sortBy (key) {
        this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
        this.sort.key = key;
        },
    }
}
</script>

<style>
table img {
    width: 50px;
    height: 50px;
}
table th.sorted {
    cursor: pointer;
}
table th.sorted::after {
    font-size: 0.5em;
    content: '▽';
}
table th.sorted.asc::after {
    content: '▲';
}
table th.sorted.desc::after {
    content: '▼';
}
</style>
